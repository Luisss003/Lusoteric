# Lusoteric

Lusoteric is an **esolang-oriented code golf REST API** developed in **TypeScript**, using a **MySQL database**, **JWT authentication**, and **Docker** for isolated code execution.

It provides a platform for solving challenges across mainstream and esoteric programming languages, emphasizing development of universal problem-solving skills, because not all problems in Lusoteric have obvious or strictly computational tools/solutions.

---

## Features

- **Multi-language support:** 10 languages including C, Java, JavaScript, Python, Go, Rust, HolyC, x86 Assembly, Chef, and Shakespeare Programming Language (SPL).  
- **Esolang execution:** Run esoteric languages in a controlled environment.  
- **Sandboxed execution:** Each code submission runs in a Docker container with limited resources, no network access, and automatic cleanup after execution.  
- **User-generated challenges:** Users can create their own challenges and test cases.  
- **User accounts:** Supports user authentication via JWT.  
- **Future plans:** Leaderboards and scoring system.

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript  
- **Authentication:** Passport.js (JWT)  
- **Database:** MySQL (accessed via Prisma ORM)  
- **Containerization:** Docker for safe, isolated code execution  
- **Frontend:** None currently (API only; frontend can be added in the future)

---

## Architecture & Safety

- Each code submission runs in its **own Docker container** with CPU and memory limits.  
- **Network access is disabled**, and all containers are removed after execution.  
- Supports **user-defined challenges** and secure execution of potentially unsafe code.  

---

## Getting Started

### Prerequisites
- Node.js v18+  
- Docker  
- MySQL database

### Installation
1. Clone the repository:
    ```bash
    git clone <repo_url>
    cd lusoteric
    ```
2. Generate public/private keys:
    ```bash
    node utils/generateKeyPair.js
    ```
    Move the generated keys to `dist/utils/`.
3. Compile the TypeScript code:
    ```bash
    tsc
    ```
4. Start the server:
    ```bash
    node dist/server.js
    ```

### Usage
- Interact with the API to create challenges, submit solutions, and retrieve results.  
- All executions are sandboxed and returned safely via the API.

---

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, new features, or language support.

---

## Future Improvements

- Scoring and leaderboards for challenges  
- Frontend interface for easier interaction  
- Additional esoteric language support
