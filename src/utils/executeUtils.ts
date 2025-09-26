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
        --memory=128m \
        --cpus=0.5 \
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
export function executeJavaScript(){}
export function executeGo(){}
export function executeRust(){}
export function executeX86(){}
export function executeHolyC(){}
export function executeShakespeare(){}
export function executeBash(){}
export function executeChef(){}