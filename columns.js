#!/usr/bin/env node

const ARGS = Array.from(process.argv).slice(2)

// console.log(ARGS)

// If COL === -1; print all of the columns
let COL = -1

if(ARGS[0] === '-n' && typeof Number(ARGS[1]) === 'number') {
    COL = Number(ARGS[1]) - 1 // we don't want offset values, we want at position value
} else {
    COL = -1
}

process.stdin.on('readable', () => {
    let chunk;

    chunk = process.stdin.read()

    while(chunk !== null) {
        let splitted = String(chunk).split('\n')
        splitted.filter(i => i.length !== 0).forEach(splitt => {
            splitted_str = splitt.split(/\s+/)
            let str = ''
            if(COL === -1) {
                str = splitted_str.join('\n') + '\n'
            } else {
                str = splitted_str[COL] + '\n'
            }
            process.stdout.write(str)
        })
        chunk = process.stdin.read()
    }
})

process.stdin.on('end', () => {})

// docker container ls -a | ./columns.js -n 1

