import { writeFile, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { write } from 'fs';

const execAsync = promisify(exec);

export async function executeC(code: string){
    //Write user code to temp file
    const tempFilePath = '/tmp/code.c';
    await writeFile(tempFilePath, code, 'utf-8');

    //Execute user code in a docker container
    const { stdout, stderr } = await execAsync(`
        docker run --rm \
        --memory=128m \
        --cpus=0.5 \
        --network=none \
        --read-only \
        --tmpfs /tmp:exec,size=50m \
        -v ${tempFilePath}:/usr/src/app/userCode.c:ro \
        -w /usr/src/app \
        gcc:latest \
        sh -c "gcc userCode.c -o /tmp/runMe && /tmp/runMe"
    `, {
        timeout: 15000,
        maxBuffer: 1024 * 1024
    });

    await unlink(tempFilePath);

    return stdout;

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

//WORK IN PROGRESS
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
    console.log(stdout)
    return stdout;
}

export function executeShakespeare(){}
export function executeBash(){}
export function executeChef(){}