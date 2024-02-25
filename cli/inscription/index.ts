import config from "./config"
import { sendOneRound } from "../../core/txProcessor"

async function main() {
    console.log("=== start ===")
    const oneRoundCount = 10
    const round = Math.ceil(config.Count / 10)
    for (let i = 0; i < round; i++) {
        try {
            await sendOneRound(oneRoundCount)
        } catch (err) {
            console.warn(`=== send round ${i} error: ${err}`)
            i--
            continue
        }
        console.log(`=== round ${i} done ===`)
    }
    console.log("=== end ===")
}

main()