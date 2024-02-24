import config from "./config"
import { sendOneRound } from "./txProcessor"

async function main() {
    console.log("=== start ===")
    const oneRoundCount = 10
    const round = Math.ceil(config.Count / 10)
    for (let i = 0; i < round; i++) {
        await sendOneRound(oneRoundCount)
        console.log(`=== round ${i} done ===`)
    }
    console.log("=== end ===")
}

main()