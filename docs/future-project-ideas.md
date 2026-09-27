# Future Project Ideas

This is a private planning backlog for projects that could eventually appear on the portfolio. An idea should not be added to the public website until there is a working artifact, an accurate short summary, and reproducible evidence.

## Publication gate

Before a project is listed publicly, confirm that it has:

- a canonical GitHub repository;
- a clear README describing the problem and the author's contribution;
- reproducible setup and run instructions;
- no private data, credentials, course-restricted material, or unlicensed assets;
- tests for the important algorithmic behavior;
- one authentic screenshot, animation, or visualization where useful;
- results compared with a reasonable baseline;
- a concise explanation of limitations.

## 1. Ant Genetic Algorithm Laboratory

**Status:** IN PROGRESS — the original source has been reviewed and preserved in the private canonical repository `https://github.com/lcris689/ant-foraging-lab`.

The existing coursework is a stochastic spatial agent-based ant-foraging simulation, not a genetic algorithm. First turn it into a reproducible visual experiment; then add a separate evolutionary extension with an explicit genome, fitness function, selection, crossover, mutation, and generations.

Potential scope:

- make the genome, fitness function, selection, crossover, and mutation steps explicit;
- allow seeded runs so results can be reproduced;
- show best and average fitness across generations;
- replay the strongest evolved behavior;
- compare evolution against a random or hand-written baseline;
- expose a small number of meaningful parameters without turning the interface into a dashboard;
- test seeded determinism, mutation bounds, crossover behavior, and fitness calculation;
- document what is biologically inspired versus what is a simplified computational model.

A polished version could combine genetic algorithms, randomized experimentation, simulation, and visualization in one project.

## 2. Randomized Algorithms Explorer

**Status:** PLANNED

Build a focused visualization around one or two randomized algorithms. Karger's minimum-cut algorithm is the strongest candidate because its graph contractions, repeated trials, and success probability can all be visualized.

Possible comparison topics:

- Karger's randomized minimum cut;
- reservoir sampling over a stream;
- randomized quicksort pivot strategies;
- Monte Carlo estimation with confidence intervals.

The application should compare theoretical expectations with empirical distributions over many seeded runs.

## 3. Evolutionary Search versus Gradient Descent

**Status:** PLANNED

Compare a genetic algorithm and gradient descent on the same objective functions. Visualize convergence, local minima, sensitivity to initialization, mutation rate, population size, and behavior on noisy or discontinuous functions.

This would connect evolutionary computation to machine learning while clearly explaining that the methods solve optimization problems differently.

## 4. Genetic DNA Motif Search

**Status:** PLANNED

Use a genetic algorithm to search for recurring motifs in a small public DNA dataset. Define the encoding and fitness function, compare against a simple baseline, and report runtime, convergence, and accuracy without making unsupported biological or medical claims.

This is the most direct continuation of bio-computing coursework, but it requires careful dataset licensing and validation.

## 5. Homelab Experiment Runner

**Status:** PLANNED — wait until the homelab has the necessary verified infrastructure.

Run batches of seeded Monte Carlo or genetic-algorithm experiments through containerized workers. Record experiment configuration, seed, status, runtime, and results, then visualize the aggregate distributions.

Potential learning areas:

- Docker workers and queues;
- reproducible experiment configuration;
- parallel execution;
- metrics and monitoring;
- result storage and visualization.

This should not be presented as deployed until the infrastructure and end-to-end run are verified in the homelab documentation.

## Suggested order

1. Inspect and improve the existing Ant Genetic Algorithm project.
2. Build a focused Karger minimum-cut or randomized-algorithm explorer.
3. Compare evolutionary search with gradient descent.
4. Attempt DNA motif search after selecting a licensed public dataset and baseline.
5. Connect experiments to the homelab only after its deployment foundation is ready.
