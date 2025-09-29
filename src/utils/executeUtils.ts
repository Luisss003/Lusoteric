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

export async function executeJava(code: string) {
    const tempFilePath = '/tmp/Main.java'; // must match `public class Main`
    await writeFile(tempFilePath, code, 'utf-8');

    const { stdout, stderr } = await execAsync(`
        docker run --rm \
        --memory=512m \
        --cpus=1 \
        --network=none \
        --read-only \
        --tmpfs /tmp:exec,size=50m \
        -v ${tempFilePath}:/usr/src/app/Main.java:ro \
        -w /usr/src/app \
        openjdk:latest \
        sh -c "javac -d /tmp Main.java && java -cp /tmp Main"
    `, {
        timeout: 15000,
        maxBuffer: 1024 * 1024
    });

    await unlink(tempFilePath);
    return stdout;
}
export async function executeJavaScript(code: string){
    const tempFilePath = '/tmp/main.js';
    await writeFile(tempFilePath, code, 'utf-8');

    const {stdout, stderr} = await execAsync(`
        docker run --rm \
        --memory=512m \
        --cpus=1 \
        --network=none \
        --read-only \
        --tmpfs /tmp:exec,size=50m \
        -v ${tempFilePath}:/usr/src/app/main.js:ro \
        -w /usr/src/app \
        node:latest \
        sh -c "node main.js"
        `,{
        timeout: 15000,
        maxBuffer: 1024 * 1024
    });

    await unlink(tempFilePath);
    return stdout;
}
export async function executeGo(code: string){
    const tempFilePath = '/tmp/main.go';
    await writeFile(tempFilePath, code, 'utf-8');

    const {stdout, stderr} = await execAsync(`
        docker run --rm \
        --memory=512m \
        --cpus=1 \
        --network=none \
        --tmpfs /tmp:exec,size=50m \
        -v ${tempFilePath}:/usr/src/app/main.go:ro \
        -w /usr/src/app \
        golang:latest \
        sh -c "go run main.go"
        `,{
        timeout: 30000,
        maxBuffer: 1024 * 1024
    });

    await unlink(tempFilePath);
    return stdout;
}
export async function executeRust(code: string){
    const tempFilePath = '/tmp/main.rs';
    await writeFile(tempFilePath, code, 'utf-8');

    const {stdout, stderr} = await execAsync(`
        docker run --rm \
        --memory=512m \
        --cpus=1 \
        --network=none \
        --tmpfs /tmp:exec,size=50m \
        -v ${tempFilePath}:/usr/src/app/main.rs:ro \
        -w /usr/src/app \
        rust:latest \
        sh -c "rustc main.rs -o main && ./main"
        `,{
        timeout: 30000,
        maxBuffer: 1024 * 1024
    });

    await unlink(tempFilePath);
    return stdout;
}
export async function executeX86(code: string){
    const tempFilePath = '/tmp/main.asm';
    await writeFile(tempFilePath, code, 'utf-8');

    const {stdout, stderr} = await execAsync(`
        docker run --rm \
            --memory=128m \
            --cpus=.5 \
            --network=none \
            --tmpfs /tmp:exec,size=100m \
            -v ${tempFilePath}:/usr/src/app/main.asm:ro \
            -w /usr/src/app \
            esolang/x86asm-nasm \
            bash -c "x86asm-nasm main.asm"
        `,{
            timeout: 10000
        })

    await unlink(tempFilePath);
    return stdout;

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

export async function executeShakespeare(code: string){
    const tempFilePath = '/tmp/main.spl';
    await writeFile(tempFilePath, code, 'utf-8');
    const {stdout, stderr} = await execAsync(`
        docker run --rm \
            --memory=512m \
            --cpus=1 \
            --network=none \
            --tmpfs /tmp:exec,size=100m \
            -v ${tempFilePath}:/usr/src/app/main.spl:ro \
            -w /usr/src/app \
            luisss003/shakespeare:latest \
            bash -c "shakespeare run main.spl"
        `,{
            timeout: 10000
        });
    
    await unlink(tempFilePath);
    return stdout;

}
export async function executeBash(code: string){
    const tempFilePath = '/tmp/main.sh';
    await writeFile(tempFilePath, code, 'utf-8');
    
    const {stdout, stderr} = await execAsync(`
        docker run --rm \
            --memory=512m \
            --cpus=1 \
            --network=none \
            --tmpfs /tmp:exec,size=100m \
            -v ${tempFilePath}:/usr/src/app/main.sh:ro \
            -w /usr/src/app \
            luisss003/shakespeare:latest \
            bash -c "bash main.sh"
        `,{
            timeout: 10000
        });
    
    await unlink(tempFilePath);
    return stdout;
}
export async function executeChef(code: string){
    const tempFilePath = '/tmp/main.chef';
    const actualCode = code.replace(/\\n/g, '\n');
    await writeFile(tempFilePath, actualCode, 'utf-8');
    
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
    return stdout;
}
