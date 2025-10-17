---
title: "Misadventures in Vibe Coding. #1 — Streaks and Cheat Weeks"
description: "A simple list traversal problem that stumps every major LLM"
---
# Misadventures in Vibe Coding #1 — Streaks and Cheat Weeks

I was updating my workout app the other day and thought I’d make a small quality-of-life improvement: allow myself to take a week off after maintaining a long enough workout streak.

This would be a simple task, just a refactor of a single function. I figured this would be the perfect test for 
large 
language 
models, I've been trying to use LLM tools more in my workflow, this seemed like a solid use case.

---

## The Background

My app tracks weekly workouts and keeps a running streak based on whether I’ve hit a certain session target per week.
I use a function that calculates the streak up to last week and whether or not the target has been hit this week. It 
simply iterates through the weeks, that are in descending order, until a week is reached that does not hit the 
target.

```kotlin
fun getTargetStreak(
    weeklyGraphData: List<Pair<String, Float>>,
    weeklySessionTarget: Int
): Pair<Int, Boolean> {
    val hitStreakThisWeek = weeklyGraphData.firstOrNull()?.let {
        it.second >= weeklySessionTarget.toFloat()
    } == true

    var streak = if (hitStreakThisWeek) 1 else 0

    for (i in 1 until weeklyGraphData.size) {
        if (weeklyGraphData[i].second >= weeklySessionTarget.toFloat()) {
            streak++
        } else {
            break
        }
    }

    return Pair(streak, hitStreakThisWeek)
}
```

All I needed to do was add a parameter for **cheat weeks**, if I’ve kept a streak for a certain number of weeks, I get 
to take the following week off without losing it.

Sounded easy enough.

---

## The Problem

So I added a new parameter:

```kotlin
fun getTargetStreak(
    weeklyGraphData: List<Pair<String, Float>>,
    weeklySessionTarget: Int,
    weeksPerStreakBreak: Int
)
```

Then I asked various LLMs to modify the function to account for cheat weeks.

![initial prompt](/media/blog/mivb-1/asking.png)

What followed was surprisingly consistent failure.

---

## The Ideal Solution

There are two ways to solve this problem

- You traverse the list backwards, iterating over the weeks in chronological order then return the streak at the end of 
  the list. This way, you can use the precalculated streak to determine when a week counts as a cheat week. This solution has a linear time complexity but it is not optimal in practice because you would always need to iterate through every week. If you have a streak of the past 4 weeks and have been using the app for 100 weeks, you would still need to iterate through 100 weeks

- Ideally, you would keep the list as is, start from the current week then work backwards chronologically. When you 
  encounter a week where the target has not been hit, you check if the next *weeksPerStreakBreak* weeks have all 
  hit the target, if so, you maintain the streak and keep going, if not, you break and return the calculated value.


The first is practically a Leetcode Easy. It's traversing a list backwards while tracking a value, the second 
is only slightly more complex with a nested loop to check the next *weeksPerStreakBreak* weeks for sub-target weeks. 
Yet, surprisingly, none of the publicly available models I tried could reliably find 
either of them.

---

## Model Attempts

### Claude 4.5

```kotlin
 fun getTargetStreak(
    weeklyGraphData: List<Pair<String, Float>>,
    weeklySessionTarget: Int,
    weeksPerStreakBreak: Int
): Pair<Int, Boolean> {
    val hitStreakThisWeek = weeklyGraphData.firstOrNull()?.let {
        it.second >= weeklySessionTarget.toFloat()
    } == true
    
    var streak = if (hitStreakThisWeek) 1 else 0
    var consecutiveWeeksBeforeBreak = if (hitStreakThisWeek) 1 else 0
    
    // Starting from the second week, check each subsequent week
    for (i in 1 until weeklyGraphData.size) {
        val hitTargetThisWeek = weeklyGraphData[i].second >= weeklySessionTarget.toFloat()
        
        if (hitTargetThisWeek) {
            // Week hit target - increment streak and consecutive weeks counter
            streak++
            consecutiveWeeksBeforeBreak++
        } else {
            // Week missed target - check if this is an earned cheat week
            if (consecutiveWeeksBeforeBreak >= weeksPerStreakBreak) {
                // Earned a cheat week! Increment streak but reset the consecutive counter
                streak++
                consecutiveWeeksBeforeBreak = 0
            } else {
                // No cheat week earned - streak is broken
                break
            }
        }
    }
    
    return Pair(streak, hitStreakThisWeek)
}
```

### Gemini 2.5 Pro

```kotlin
fun getTargetStreak(
    weeklyGraphData: List<Pair<String, Float>>,
    weeklySessionTarget: Int,
    weeksPerStreakBreak: Int
): Pair<Int, Boolean> {
    // Handle the case where there is no workout data yet.
    if (weeklyGraphData.isEmpty()) {
        return Pair(0, false)
    }

    // Determine if the most recent week (the first item in the list) hit the target.
    // This is returned to let the UI know the current week's status.
    val hitStreakThisWeek = weeklyGraphData.first().second >= weeklySessionTarget

    var streak = 0
    var consecutiveHits = 0 // Tracks successful weeks to earn a cheat week.
    var cheatWeeksAvailable = 0

    // Iterate through your workout history, from most recent to oldest.
    for (weekData in weeklyGraphData) {
        val metTarget = weekData.second >= weeklySessionTarget

        if (metTarget) {
            // --- SUCCESSFUL WEEK ---
            streak++
            consecutiveHits++

            // If you've hit the required number of consecutive weeks, you earn a cheat week!
            if (consecutiveHits == weeksPerStreakBreak) {
                cheatWeeksAvailable++
                consecutiveHits = 0 // Reset the counter to start earning the next one.
            }
        } else {
            // --- MISSED WEEK ---
            // Check if you have a cheat week to spend.
            if (cheatWeeksAvailable > 0) {
                // Use a cheat week to save your streak!
                streak++
                cheatWeeksAvailable--
                // Using a cheat week resets the consecutive hit counter.
                consecutiveHits = 0
            } else {
                // No cheat weeks left. The streak is officially broken.
                break
            }
        }
    }

    return Pair(streak, hitStreakThisWeek)
}
```

### Grok 4

```kotlin
fun getTargetStreak(
    weeklyGraphData: List<Pair<String, Float>>,
    weeklySessionTarget: Int,
    weeksPerStreakBreak: Int
): Pair<Int, Boolean> {
    if (weeklyGraphData.isEmpty()) return Pair(0, false)
    
    // Check if current week meets target
    val hitStreakThisWeek = weeklyGraphData.first().second >= weeklySessionTarget.toFloat()
    
    var streak = if (hitStreakThisWeek) 1 else 0
    var cheatWeeksAvailable = streak / weeksPerStreakBreak
    
    // Start from second week
    for (i in 1 until weeklyGraphData.size) {
        if (weeklyGraphData[i].second >= weeklySessionTarget.toFloat()) {
            streak++
            // Update cheat weeks after incrementing streak
            cheatWeeksAvailable = streak / weeksPerStreakBreak
        } else if (cheatWeeksAvailable > 0) {
            // Use a cheat week if available and continue streak
            cheatWeeksAvailable--
            streak++
        } else {
            // Break streak if no cheat weeks available
            break
        }
    }
    
    return Pair(streak, hitStreakThisWeek)
}
```

### GPT-5

```kotlin
fun getTargetStreak(
    weeklyGraphData: List<Pair<String, Float>>,
    weeklySessionTarget: Int,
    weeksPerStreakBreak: Int
): Pair<Int, Boolean> {
    // Determine if the most recent week hit the target
    val hitStreakThisWeek = weeklyGraphData.firstOrNull()?.let {
        it.second >= weeklySessionTarget.toFloat()
    } == true

    var streak = 0
    var cheatWeeksUsed = 0

    // Iterate over each week from most recent to oldest
    for (i in weeklyGraphData.indices) {
        val hitTarget = weeklyGraphData[i].second >= weeklySessionTarget.toFloat()

        if (hitTarget) {
            // If the target was hit, increment streak normally
            streak++
        } else {
            // Check if this week can be treated as a "cheat week"
            val totalCycles = (streak + cheatWeeksUsed) / weeksPerStreakBreak
            val allowedCheats = totalCycles + 1  // You earn 1 cheat per full cycle
            if (cheatWeeksUsed < allowedCheats) {
                // Use one cheat week without breaking streak
                cheatWeeksUsed++
                streak++
            } else {
                // No cheats left → streak breaks
                break
            }
        }
    }

    return Pair(streak, hitStreakThisWeek)
}

```

TLDR; All of them misunderstood the structure of the data:  
the list is in **reverse chronological order** (this week first, older weeks later).  
Every model treated it as chronological, walking the weeks forward instead of backward.

---

## Second Round

Even after explaining the problem and showing examples, **Claude and Gemini still failed** on revision, they continued counting in the wrong direction or applied the cheat logic incorrectly.

**Grok and GPT** eventually got it right, but only with deep thinking and after explaining the crux of their confusion and telling them what to do.

### Grok 4

```kotlin
fun getTargetStreak(
    weeklyGraphData: List<Pair<String, Float>>,
    weeklySessionTarget: Int,
    weeksPerStreakBreak: Int
): Pair<Int, Boolean> {
    if (weeklyGraphData.isEmpty()) return Pair(0, false)

    val hitStreakThisWeek = weeklyGraphData[0].second >= weeklySessionTarget.toFloat()
    if (!hitStreakThisWeek) return Pair(0, false)

    var streak = 1
    for (i in 1 until weeklyGraphData.size) {
        if (weeklyGraphData[i].second >= weeklySessionTarget.toFloat()) {
            streak++
        } else {
            // Check if we can use a cheat week: verify if the next 'weeksPerStreakBreak' weeks (further back) are all successful
            val canCheat = (i + weeksPerStreakBreak < weeklyGraphData.size) &&
                (i + 1..i + weeksPerStreakBreak).all { j ->
                    weeklyGraphData[j].second >= weeklySessionTarget.toFloat()
                }
            if (canCheat) {
                streak++
            } else {
                break
            }
        }
    }
    return Pair(streak, hitStreakThisWeek)
}
```

GPT 5 had a similar solution to Grok's (solution #2), but that's only because i explained that specific solution.

---

## Turning It into a LeetCode Problem

To see if the misunderstanding came from the real-world “fitness app” framing,  
I reframed it as a pure algorithmic problem and set up a python script with a few test cases to quickly test solutions:

![As a leetcode problem](/media/blog/mivb-1/lc_problem.png)

In this case I did not explain the solution. The only thing i did on failure was to reprompt with the failed testcases

## Attempts

### Claude 4.5

```python
def weekly_streak(workouts, target, weeksPerCheatWeek):
    """
    Calculate the current workout streak with cheat week mechanics.
    
    Args:
        workouts: List of integers (most recent to oldest)
        target: Minimum workouts per week to count as successful
        weeksPerCheatWeek: Number of successful weeks needed to earn a cheat week
    
    Returns:
        int: Current streak length
    """
    if not workouts:
        return 0
    
    streak = 0
    consecutive_successful = 0  # Consecutive successful weeks in current earning cycle
    cheat_weeks_available = 0   # Number of cheat weeks earned and available
    
    for i in range(len(workouts)):
        week_workouts = workouts[i]
        
        # Check if this week meets the target
        if week_workouts >= target:
            # Successful week
            streak += 1
            consecutive_successful += 1
            
            # Check if we earned a new cheat week
            if consecutive_successful == weeksPerCheatWeek:
                cheat_weeks_available += 1
                consecutive_successful = 0  # Reset the counter
        else:
            # Week doesn't meet target - can we use a cheat week?
            if cheat_weeks_available > 0:
                # Use a cheat week to continue the streak
                streak += 1
                cheat_weeks_available -= 1
                # Reset consecutive successful counter since we used a cheat
                consecutive_successful = 0
            else:
                # No cheat weeks available - streak ends
                break
    
    return streak
```

### Gemini 2.5 Pro

```python
def calculate_weekly_streak(
    workouts: List[int], 
    target: int, 
    weeksPerCheatWeek: int
) -> int:
    """
    Calculates the current workout streak, allowing for one "cheat week".

    A streak is a sequence of recent weeks where each week either meets the
    target workout count or is a single "cheat week". A cheat week can only
    be used after the streak has lasted for at least `weeksPerCheatWeek`.

    Args:
        workouts: A list of weekly workout counts, from most recent to oldest.
        target: The target number of workouts for a successful week.
        weeksPerCheatWeek: The number of weeks a streak must last to earn
                           the option of using one cheat week.

    Returns:
        The length of the current workout streak.
    """
    current_streak = 0
    cheat_week_used = False

    # Iterate from the most recent week backwards
    for weekly_workout_count in workouts:
        if weekly_workout_count >= target:
            # Successful week: extend the streak
            current_streak += 1
        else:
            # Missed week: check if a cheat week can be used
            if not cheat_week_used and current_streak >= weeksPerCheatWeek:
                # Use the one-time cheat week
                cheat_week_used = True
                current_streak += 1  # The cheat week counts towards the streak
            else:
                # No cheat week available or streak isn't long enough.
                # The streak is broken.
                break
                
    return current_streak
```

### Grok 4

```python
def weeklyStreak(workouts, target, weeksPerCheatWeek):
    streak = 0  # Current streak length
    cheat_weeks_available = 0  # Number of cheat weeks earned
    
    # Iterate through weeks from most recent (index 0) to oldest
    for i in range(len(workouts)):
        if workouts[i] >= target:
            # Successful week: meets or exceeds target
            streak += 1
            # Earn a cheat week for every weeksPerCheatWeek successful weeks
            if streak >= weeksPerCheatWeek:
                cheat_weeks_available = streak // weeksPerCheatWeek
        elif cheat_weeks_available > 0:
            # Week doesn't meet target, but we can use a cheat week
            streak += 1
            cheat_weeks_available -= 1
        else:
            # Week doesn't meet target and no cheat weeks available, streak ends
            break
    
    return streak
```

### GPT 5

```python
def weekly_streak(workouts, target, weeksPerCheatWeek):
    cheats = 0
    success_streak = 0
    total_streak = 0

    for w in workouts:
        if w >= target:
            success_streak += 1
            total_streak += 1
            if success_streak == weeksPerCheatWeek:
                cheats += 1
                success_streak = 0
        else:
            if cheats > 0:
                cheats -= 1
                total_streak += 1
                success_streak = 0  # reset, since it's not a success
            else:
                break

    return total_streak
```

### Results

Complete Failure.

Not a single LLM, not Claude, not Gemini, not Grok, not GPT, solved it correctly when presented as a LeetCode problem.  
Each produced incorrect code or failed edge cases even with multiple attempts.
Feel free to try them yourself, here's a few testcases.

```python
streakWithCheatWeeksTestCases = [
        {"params": [[2, 4, 3, 5, 2, 3, 3, 4, 0, 4, 4, 4, 1], 3, 3], "ret": 12},
        {"params": [[2, 4, 3, 5, 2], 3, 3], "ret": 4}, 
        {"params": [[5, 5, 5, 3, 5, 2], 5, 2], "ret": 3},
   ]
```

---

## Why does this happen?

I assume some sort of pattern matching based on the fact that even when distilled into a conventional leetcode 
problem it is still unsolvable.
Problems with similar parameters are almost always structured in chronological order (index 0 = earliest, index n-1 
= latest). It’s likely that this implicit pattern has more salience to the model than the explicit instructions 
provided. I plan to try playing around with such problems to see if this is a consistent pattern.

Either way, this tiny function became a surprisingly effective test case for “vibe coding” reasoning, it's these kinds of small silent bugs constructively interfering with each other that make it impossible to build out large codebases through vibe-coding and it's likely that there's several such landmines in any LLM generated code.
