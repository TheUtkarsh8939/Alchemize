type Log = {
    status: "ap" | "re" | "pe", //approved, rejected, pending
    time: number, //time in minutes
}
function parseLogSyntax(log: string): Log[] {
    //LOG SYNTAX: The logs are the data showing past approvals and current state
    //Each new log entry is seperated by a comma(,)
    //Each log entry has 8 charecters, first two reperesent its status(it can be "ap" for approved, "re" for rejected, "pe" for pending)
    //Rest of charectors reperesent time that the status represent, they are total number of minutes
    //Example Log: "ap000010,pe003223"
    //A log can only have one pending entry, and it has to be the last entry, and only one number of re entries can be there which must be the last entry
    //Whenever log is appended lets say the log "ap000010,pe003223" is there and the project gets approved, then log will be updated to "ap000010,ap003223"
    //If log is "ap000010,pe003223" and project gets rejected, then log will be updated to "ap000010,re003223"
    //If log is "ap000010,re003223" and project gets updated again with 20 minutes, then log will be updated to "ap000010,pe003243"
    const logEntries = log.split(',');
    return logEntries.map(entry => {
        const status = entry.substring(0, 2) as "ap" | "re" | "pe";
        const time = parseInt(entry.substring(2), 10);
        return { status, time };
    });
}
console.log("case 1:", parseLogSyntax("ap000010,pe003223"));
console.log("case 2:", parseLogSyntax("ap000010,re003223"));
console.log("case 3:", parseLogSyntax("ap000010,pe003243"));