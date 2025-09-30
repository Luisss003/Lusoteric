import { writeFile, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { write } from 'fs';

const execAsync = promisify(exec);

export async function executeC(
    code: string, 
    testCases: { input: string; output: string }[]
): Promise<{ output: string; passed: boolean }> {
    
    const tempFilePath = '/tmp/code.c';
    await writeFile(tempFilePath, code, 'utf-8');

    const results: string[] = [];
    let allPassed = true;

    for (const testCase of testCases) {
        const { stdout } = await execAsync(
            `docker run --rm \
            --memory=128m \
            --cpus=0.5 \
            --network=none \
            --read-only \
            --tmpfs /tmp:exec,size=50m \
            -v ${tempFilePath}:/usr/src/app/userCode.c:ro \
            -w /usr/src/app \
            gcc:latest \
            sh -c "gcc userCode.c -o /tmp/runMe && echo '${testCase.input}' | /tmp/runMe"`,
            { timeout: 15000, maxBuffer: 1024 * 1024 }
        );

        const got = stdout.trim();
        const passed = got === testCase.output;

        if (!passed) allPassed = false;

        results.push(
            `input: ${testCase.input}, got: ${got}, expected: ${testCase.output}, result: ${passed ? 'success' : 'fail'}`
        );
    }

    await unlink(tempFilePath);

    return {
        output: results.join('\n'),
        passed: allPassed
    };
}

export async function executeJava(
    code: string,
    testCases: { input: string; output: string }[]
    ): Promise<{ output: string; passed: boolean }> {
    
        const tempFilePath = '/tmp/Main.java'; 
        await writeFile(tempFilePath, code, 'utf-8');
        let allPassed = true;
        let results: string[] = [];

        for(const testCase of testCases){
            const { stdout } = await execAsync(`
                docker run --rm \
                --memory=512m \
                --cpus=1 \
                --network=none \
                --read-only \
                --tmpfs /tmp:exec,size=50m \
                -v ${tempFilePath}:/usr/src/app/Main.java:ro \
                -w /usr/src/app \
                openjdk:latest \
                sh -c "javac -d /tmp Main.java && echo '${testCase.input}' | java -cp /tmp Main"
            `, { timeout: 15000, maxBuffer: 1024 * 1024 });

            const got = stdout.trim();
            const passed = got === testCase.output;

            if(!passed) allPassed = false;
            results.push(
                `input: ${testCase.input}, got: ${got}, expected: ${testCase.output}, result: ${passed ? 'success' : 'fail'}`
            )
        };

        await unlink(tempFilePath);
        return  {
            output: results.join('\n'),
            passed: allPassed
        } ;
}
export async function executeJavaScript(
    code: string, 
    testCases: { input: string; output: string }[]
): Promise<{ output: string; passed: boolean }> {
    const tempFilePath = '/tmp/main.js';
    await writeFile(tempFilePath, code, 'utf-8');

    const results: string[] = [];
    let allPassed = true;

    for (const testCase of testCases) {
        const { stdout } = await execAsync(
            `docker run --rm \
            --memory=128m \
            --cpus=0.5 \
            --network=none \
            --read-only \
            --tmpfs /tmp:exec,size=50m \
            -v ${tempFilePath}:/usr/src/app/main.js:ro \
            -w /usr/src/app \
            node:latest \
            sh -c "echo '${testCase.input}' | node main.js"
            `,{ timeout: 15000, maxBuffer: 1024 * 1024 }
        );

        const got = stdout.trim();
        const passed = got === testCase.output;

        if (!passed) allPassed = false;

        results.push(
            `input: ${testCase.input}, got: ${got}, expected: ${testCase.output}, result: ${passed ? 'success' : 'fail'}`
        );
    }


    await unlink(tempFilePath);
    return {
        output: results.join('\n'),
        passed: allPassed
    };
}

export async function executeGo(
    code: string, 
    testCases: { input: string; output: string }[]
): Promise<{ output: string; passed: boolean }> {
        const tempFilePath = '/tmp/main.go';
        await writeFile(tempFilePath, code, 'utf-8');
        let allPassed = true;
        let results: string[] = [];

        for(const testCase of testCases){
            const { stdout } = await execAsync(`
                docker run --rm \
                --memory=512m \
                --cpus=1 \
                --network=none \
                --tmpfs /tmp:exec,size=50m \
                -v ${tempFilePath}:/usr/src/app/main.go:ro \
                -w /usr/src/app \
                golang:latest \
                sh -c "echo '${testCase.input}' | go run main.go"
                `,{ timeout: 30000,maxBuffer: 1024 * 1024 });
            
                const got = stdout.trim();
                const passed = got === testCase.output;

                if(!passed) allPassed = false;
                results.push(
                    `input: ${testCase.input}, got: ${got}, expected: ${testCase.output}, result: ${passed ? 'success' : 'fail'}`
                );
        }
        await unlink(tempFilePath);
        return  {
            output: results.join('\n'),
            passed: allPassed
        } ;
}
export async function executeRust(
    code: string, 
    testCases: { input: string; output: string }[]
): Promise<{ output: string; passed: boolean }> {
        const tempFilePath = '/tmp/main.rs';
        await writeFile(tempFilePath, code, 'utf-8');
        const results: string[] = [];
        let allPassed = true;

        for (const testCase of testCases) {
            const { stdout } = await execAsync(
                `docker run --rm \
                --memory=128m \
                --cpus=0.5 \
                --network=none \
                --read-only \
                --tmpfs /tmp:exec,size=50m \
                -v ${tempFilePath}:/usr/src/app/main.rs:ro \
                -w /usr/src/app \
                rust:latest \
                sh -c "rustc main.rs -o main && echo '${testCase.input}' | ./main"
                `,{ timeout: 15000, maxBuffer: 1024 * 1024 }
            );

            const got = stdout.trim();
            const passed = got === testCase.output;

            if (!passed) allPassed = false;

            results.push(
                `input: ${testCase.input}, got: ${got}, expected: ${testCase.output}, result: ${passed ? 'success' : 'fail'}`
            );
        }

        await unlink(tempFilePath);
        return {
            output: results.join('\n'),
            passed: allPassed
        };
}
export async function executeX86(
    code: string, 
    testCases: { input: string; output: string }[]
): Promise<{ output: string; passed: boolean }> {
        const tempFilePath = '/tmp/main.asm';
        await writeFile(tempFilePath, code, 'utf-8');
        const results: string[] = [];
        let allPassed = true;
        for (const testCase of testCases) {
            const { stdout } = await execAsync(
                `docker run --rm \
                --memory=128m \
                --cpus=0.5 \
                --network=none \
                --read-only \
                --tmpfs /tmp:exec,size=50m \
                -v ${tempFilePath}:/usr/src/app/main.rs:ro \
                -w /usr/src/app \
                esolang/x86asm-nasm \
                bash -c "echo '${testCase.input}' | x86asm-nasm main.asm"
                `,{ timeout: 15000, maxBuffer: 1024 * 1024 }
            );

            const got = stdout.trim();
            const passed = got === testCase.output;

            if (!passed) allPassed = false;

            results.push(
                `input: ${testCase.input}, got: ${got}, expected: ${testCase.output}, result: ${passed ? 'success' : 'fail'}`
            );
        }

        await unlink(tempFilePath);
        return {
            output: results.join('\n'),
            passed: allPassed
        };
}

//WIP
//Unable to get stdout from holy c executable
export async function executeHolyC(code: string){
    const tempFilePath = '/tmp/main.HC';
    await writeFile(tempFilePath, code, 'utf-8');
    const {stdout, stderr} = await execAsync(`
        docker run --rm \
            --memory=512m \
            --cpus=1 \
            --network=none \
            --tmpfs /tmp:exec,size=100m \
            -v ${tempFilePath}:/usr/src/app/main.HC:ro \
            -w /usr/src/app \
            luisss003/holyc:latest \
            bash -c "hcc -run ./main.HC"
        `,{
            timeout: 10000
        })

    await unlink(tempFilePath);
    return stdout;
}

export async function executeShakespeare(
    code: string, 
    testCases: { input: string; output: string }[]
): Promise<{ output: string; passed: boolean }> {
        const tempFilePath = '/tmp/main.spl';
        await writeFile(tempFilePath, code, 'utf-8');
        const results: string[] = [];
        let allPassed = true;

        for(const testCase of testCases){
            const { stdout } = await execAsync(`
                docker run --rm \
                --memory=512m \
                --cpus=1 \
                --network=none \
                --tmpfs /tmp:exec,size=50m \
                -v ${tempFilePath}:/usr/src/app/main.spl:ro \
                -w /usr/src/app \
                luisss003/shakespeare:latest \
                sh -c "echo '${testCase.input}' | shakespeare run main.spl"
                `,{ timeout: 30000,maxBuffer: 1024 * 1024 });
            
                const got = stdout.trim();
                const passed = got === testCase.output;

                if(!passed) allPassed = false;
                results.push(
                    `input: ${testCase.input}, got: ${got}, expected: ${testCase.output}, result: ${passed ? 'success' : 'fail'}`
                );
        }
        await unlink(tempFilePath);
        return  {
            output: results.join('\n'),
            passed: allPassed
        } ;
    }


export async function executeBash(
    code: string, 
    testCases: { input: string; output: string }[]
): Promise<{ output: string; passed: boolean }> {
        const tempFilePath = '/tmp/main.sh';
        await writeFile(tempFilePath, code, 'utf-8');
        const results: string[] = [];
        let allPassed = true;

        for(const testCase of testCases){
            const { stdout } = await execAsync(`
                docker run --rm \
                --memory=512m \
                --cpus=1 \
                --network=none \
                --tmpfs /tmp:exec,size=50m \
                -v ${tempFilePath}:/usr/src/app/main.sh:ro \
                -w /usr/src/app \
                bash -c "echo ${testCase.input} | bash main.sh"
                `,{ timeout: 30000,maxBuffer: 1024 * 1024 });
            
                const got = stdout.trim();
                const passed = got === testCase.output;

                if(!passed) allPassed = false;
                results.push(
                    `input: ${testCase.input}, got: ${got}, expected: ${testCase.output}, result: ${passed ? 'success' : 'fail'}`
                );
        }
        await unlink(tempFilePath);
            return {
                output: results.join('\n'),
                passed: allPassed
            };
        }

//WIP
//NEED TO FIND BETTER CHEF INTERPRETER
//Currently best interpreter is java, so will be creating docker image forit
export async function executeChef(
    code: string, 
    testCases: { input: string; output: string }[]
): Promise<{ output: string; passed: boolean }> {
        const tempFilePath = '/tmp/main.chef';
        const actualCode = code.replace(/\\n/g, '\n');
        await writeFile(tempFilePath, actualCode, 'utf-8');
        const results: string[] = [];
        let allPassed = true;
    const {stdout, stderr} = await execAsync(`
        docker run --rm \
            --memory=512m \
            --cpus=1 \
            --network=none \
            --tmpfs /tmp:exec,size=100m \
            -v ${tempFilePath}:/usr/src/app/main.chef:ro \
            -w /usr/src/app \
            luisss003/chef:latest \
            bash -c "python chef.py main.chef"
        `,{
            timeout: 10000
        });
    
    await unlink(tempFilePath);
        return {
            output: results.join('\n'),
            passed: allPassed
        };}
