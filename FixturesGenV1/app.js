// ======================================================
// GLOBAL STATE
// ======================================================

let selectedTeam=null;

let pairUsage={MD:{},XD:{},WD:{}};
let koPairUsage={MD:{},XD:{},WD:{}};

let timeUsage={};
let playerCategoryUsage={MD:{},XD:{},WD:{}};
let koRoundUsage={};

let stageMap={};

const teamSelect=document.getElementById("teamSelect");
const scheduleBody=document.getElementById("scheduleBody");

const rulesContainer = document.getElementById("rulesContainer");
const appContainer   = document.getElementById("appContainer");

teamSelect.addEventListener("change", e => {

    selectedTeam = e.target.value;

    if(!selectedTeam){
        rulesContainer.style.display="block";
        appContainer.style.display="none";
        return;
    }

    rulesContainer.style.display="none";
    appContainer.style.display="block";

    resetState();
    renderSchedule();
});

teamSelect.addEventListener("change", e=>{

    selectedTeam = e.target.value;

    if(!selectedTeam){
        rulesView.classList.remove("hidden");
        appView.classList.add("hidden");
        matrixSection.classList.add("hidden");
        return;
    }

    // SHOW APP
    rulesView.classList.add("hidden");
    appView.classList.remove("hidden");
    matrixSection.classList.remove("hidden");

    resetState();
    renderSchedule();
});

function resetState(){
    pairUsage={MD:{},XD:{},WD:{}};
    koPairUsage={MD:{},XD:{},WD:{}};
    timeUsage={};
    playerCategoryUsage={MD:{},XD:{},WD:{}};
    koRoundUsage={};
}

// ======================================================
// UTIL
// ======================================================

const pairKey=(a,b)=>a&&b?[a,b].sort().join("|"):null;

const repeatedMDPairs=()=>
    Object.values(pairUsage.MD).filter(v=>v===2).length;

const getStage=time=>stageMap[time]?.stage||"League";
const getRound=time=>stageMap[time]?.round||null;

const sortTimes=t=>
    t.sort((a,b)=>new Date("1970 "+a)-new Date("1970 "+b));

// ======================================================
// RENDER
// ======================================================

function renderSchedule(){

    scheduleBody.innerHTML="";
    if(!selectedTeam) return;

    stageMap={};
    FIXTURES.forEach(f=>{
        if(f.stage==="Knockout")
            stageMap[f.time]={stage:"Knockout",round:f.round};
    });

    const grouped={};

    FIXTURES.forEach(f=>{

        if(
            f.stage!=="Knockout" &&
            f.teamA!==selectedTeam &&
            f.teamB!==selectedTeam
        ) return;

        grouped[f.time]??={MD:null,XD:null,WD:null};

        const opponent=
            f.teamA===selectedTeam?f.teamB:f.teamA;

        grouped[f.time][f.category]=opponent;
    });

    sortTimes(Object.keys(grouped)).forEach(time=>{

        const g=grouped[time];

        const tr=document.createElement("tr");
        tr.innerHTML=`
            <td>${time}</td>
            <td>${categoryUI(g.MD,"MD",time)}</td>
            <td>${categoryUI(g.XD,"XD",time)}</td>
            <td>${categoryUI(g.WD,"WD",time)}</td>
        `;
        scheduleBody.appendChild(tr);
    });

    attachDropdowns();
    attachDropdowns();
renderUsageDashboard();
}

// ======================================================

function categoryUI(opponent,type,time){

    if(getStage(time)==="Knockout"){
        return `
        <div class="categoryBox knockout">
            <div class="opponent">
                TBD <span class="stageBadge">KO</span>
            </div>
            <select data-type="${type}" data-time="${time}" data-pos="1"></select>
            <select data-type="${type}" data-time="${time}" data-pos="2"></select>
        </div>`;
    }

    if(!opponent) return `<div class="breakCell">BREAK</div>`;

    return `
    <div class="categoryBox">
        <div class="opponent">${opponent}</div>
        <select data-type="${type}" data-time="${time}" data-pos="1"></select>
        <select data-type="${type}" data-time="${time}" data-pos="2"></select>
    </div>`;
}

// ======================================================
// DROPDOWNS
// ======================================================

function attachDropdowns(){
    document.querySelectorAll(".categoryBox select")
        .forEach(sel=>{
            sel.onchange=handleChange;
            populateSelect(sel);
        });
}

function populateSelect(select){

    const type = select.dataset.type;
    const pos  = select.dataset.pos;
    const time = select.dataset.time;
    const current = select.value;

    const stage = getStage(time);

    const box = select.closest(".categoryBox");
    const other =
        box.querySelector(
            `select[data-pos="${pos==="1"?"2":"1"}"]`
        );

    // ---------------- PLAYER FILTER ----------------

    const players = TEAMS[selectedTeam].filter(p=>{
        if(type==="MD") return p.gender==="M";
        if(type==="WD") return p.gender==="W";
        if(type==="XD")
            return pos==="1"
                ? p.gender==="M"
                : p.gender==="W";
    });

    select.innerHTML=`<option value="">Select</option>`;

    players.forEach(p=>{

        // keep selected value
        if(p.name===current){
            addOption(select,p.name);
            return;
        }

        // ❌ same partner twice
        if(other.value===p.name) return;

        // ❌ same time different category
        if(timeUsage[time]?.includes(p.name)) return;

        const key = pairKey(p.name, other.value);
        const used = pairUsage[type][key] || 0;

        // =================================================
        // WOMEN RULE
        // =================================================
        if(type==="WD" && key){
            if(used >= 3) return;
        }

        // =================================================
        // MEN MD RULE
        // =================================================
        if(type==="MD"){

            const mdCount =
                playerCategoryUsage.MD[p.name] || 0;

            const playersWith5 =
                Object.values(playerCategoryUsage.MD)
                .filter(v=>v>=5).length;

            if(mdCount >= 5) return;

            if(mdCount >=4 && playersWith5>=1)
                return;
        }

        // =================================================
        // XD MALE RULE
        // =================================================
        if(type==="XD" && p.gender==="M"){

            const xdCount =
                playerCategoryUsage.XD[p.name] || 0;

            const malesWith3 =
                Object.entries(playerCategoryUsage.XD)
                .filter(([name,c])=>
                    c>=3 &&
                    TEAMS[selectedTeam]
                        .find(x=>x.name===name)?.gender==="M"
                ).length;

            if(xdCount>=3) return;

            if(xdCount>=2 && malesWith3>=1)
                return;
        }

        // women XD max 4
        if(type==="XD" && p.gender==="W"){
            if((playerCategoryUsage.XD[p.name]||0)>=4)
                return;
        }

        // =================================================
        // PAIR RULES
        // =================================================
        if(key){

            if(stage==="Knockout"){
                if(used>=1) return;
            }
            else{

                if(type==="MD"){
                    if(used>=2) return;
                    if(used===1 && repeatedMDPairs()>=1)
                        return;
                }

                if(type==="XD" && used>=1) return;
            }
        }

        addOption(select,p.name);
    });

    if(current) select.value=current;
}
function addOption(select,name){
    const o=document.createElement("option");
    o.value=name;
    o.textContent=name;
    select.appendChild(o);
}

// ======================================================
// STATE UPDATE
// ======================================================

function handleChange(){
    rebuildState();

    document
        .querySelectorAll(".categoryBox select")
        .forEach(populateSelect);

    renderUsageDashboard();   // ⭐ ADD THIS
}

function rebuildState(){

    pairUsage={MD:{},XD:{},WD:{}};
    koPairUsage={MD:{},XD:{},WD:{}};
    timeUsage={};
    playerCategoryUsage={MD:{},XD:{},WD:{}};
    koRoundUsage={};

    document.querySelectorAll(".categoryBox")
    .forEach(box=>{

        const selects=box.querySelectorAll("select");
        const type=selects[0].dataset.type;
        const time=selects[0].dataset.time;

        const round=getRound(time);
        const stage=getStage(time);

        const p1=selects[0].value;
        const p2=selects[1].value;

        [p1,p2].forEach(p=>{
            if(!p) return;

            timeUsage[time]??=[];
            timeUsage[time].push(p);

            playerCategoryUsage[type][p] =
                (playerCategoryUsage[type][p]||0)+1;

            if(round){
                koRoundUsage[round] ??= {};

koRoundUsage[round][p] ??= new Set();
koRoundUsage[round][p].add(type);
            }
        });

        const key=pairKey(p1,p2);
        if(!key) return;

        if(stage==="Knockout")
            koPairUsage[type][key]=(koPairUsage[type][key]||0)+1;
        else
            pairUsage[type][key]=(pairUsage[type][key]||0)+1;
    });
}

// ======================================================
// TOURNAMENT VALIDATOR
// ======================================================

function validateTournament(){

    const panel = document.getElementById("validatorPanel");
    panel.innerHTML="";

    document.querySelectorAll("select")
        .forEach(s=>s.classList.remove("violation"));

    const errors=[];

    const malePlayers =
        TEAMS[selectedTeam].filter(p=>p.gender==="M")
        .map(p=>p.name);

    // ----------------------------------
    // MD PLAYER LIMIT (<=4)
    // ----------------------------------

    malePlayers.forEach(p=>{
        const mdCount = playerCategoryUsage.MD[p] || 0;

        if(mdCount>5)
            errors.push(`${p} exceeds MD limit (max 5)`);
    });

    // ----------------------------------
    // ONLY ONE REPEATED MD PAIR
    // ----------------------------------

    const repeatedPairs =
        Object.entries(pairUsage.MD)
        .filter(([k,v])=>v===2);

    if(repeatedPairs.length>1)
        errors.push("Only ONE Men's pair may repeat twice.");

    // ----------------------------------
    // XD MALE LIMITS
    // ----------------------------------

    let malesWith3=0;

    malePlayers.forEach(p=>{

        const xdCount = playerCategoryUsage.XD[p] || 0;

        if(xdCount>3)
            errors.push(`${p} exceeds XD max (3)`);

        if(xdCount===3) malesWith3++;
    });

    if(malesWith3>1)
        errors.push("Only ONE male player may play 3 XD matches.");

    // ----------------------------------
    // WD PAIR LIMIT (<=3 TOTAL)
    // ----------------------------------

    Object.entries(pairUsage.WD).forEach(([pair,count])=>{
        if(count>3)
            errors.push(`Women's pair ${pair} exceeds 3 matches.`);
    });

    // ----------------------------------
    // KO CATEGORY CONFLICT
    // ----------------------------------

    const knockoutUsage={};

    document.querySelectorAll(".categoryBox.knockout")
    .forEach(box=>{

        const selects=box.querySelectorAll("select");
        const type=selects[0].dataset.type;
        const time=selects[0].dataset.time;

        [selects[0].value,selects[1].value]
        .forEach(player=>{

            if(!player) return;

            knockoutUsage[player] ??= {};
            knockoutUsage[player][time] ??= [];

            knockoutUsage[player][time].push(type);
        });
    });

    Object.entries(knockoutUsage).forEach(([player,times])=>{
        Object.entries(times).forEach(([time,cats])=>{
            if(cats.length>1)
                errors.push(
                    `${player} plays multiple categories in KO round ${time}`
                );
        });
    });

    // ----------------------------------
    // DISPLAY RESULT
    // ----------------------------------

    if(errors.length===0){
        panel.innerHTML =
            `<div class="validatorOk">✅ All tournament rules satisfied.</div>`;
        return;
    }

    errors.forEach(e=>{
        const div=document.createElement("div");
        div.className="validatorError";
        div.textContent="⚠ "+e;
        panel.appendChild(div);
    });
}
function renderUsageDashboard(){

    const container =
        document.getElementById("usageDashboard");

    if(!container || !selectedTeam) return;

    container.innerHTML="";

    const players = TEAMS[selectedTeam];

    players.forEach(player=>{

        const md =
            playerCategoryUsage.MD[player.name] || 0;

        const xd =
            playerCategoryUsage.XD[player.name] || 0;

        const wd =
            playerCategoryUsage.WD[player.name] || 0;

        const mdLimit =
            player.gender==="M" ? 5 : "-";

        const xdLimit =
            player.gender==="M" ? 3 : 4;

        const wdLimit =
            player.gender==="W" ? 3 : "-";

        let statusClass="status-ok";
        let label="OK";

        if(
            (player.gender==="M" && (md>=4 || xd>=2)) ||
            (player.gender==="W" && (wd>=2 || xd>=3))
        ){
            statusClass="status-warn";
            label="NEAR";
        }

        if(
            (player.gender==="M" && (md>=5 || xd>=3)) ||
            (player.gender==="W" && (wd>=3 || xd>=4))
        ){
            statusClass="status-bad";
            label="FULL";
        }

        const row=document.createElement("div");
        row.className="playerRow";

        row.innerHTML=`
            <div class="playerName">${player.name}</div>

            <div class="usageStats">
                <span>MD ${md}/${mdLimit}</span>
                <span>XD ${xd}/${xdLimit}</span>
                <span>WD ${wd}/${wdLimit}</span>
                <span class="${statusClass}">${label}</span>
            </div>
        `;

        container.appendChild(row);
    });
}

// ======================================================
// EXPORT TO EXCEL
// ======================================================

function exportExcel(){

    const table = document.querySelector("table");

    if(!table){
        alert("Nothing to export");
        return;
    }

    const data = [];

    // HEADER ROW
    const headers = [];
    table.querySelectorAll("thead th")
        .forEach(th => headers.push(th.innerText.trim()));

    data.push(headers);

    // BODY ROWS
    table.querySelectorAll("tbody tr")
        .forEach(tr => {

            const row = [];

            tr.querySelectorAll("td")
                .forEach((td,index)=>{

                    // TIME COLUMN
                    if(index===0){
                        row.push(td.innerText.trim());
                        return;
                    }

                    // BREAK CELL
                    const breakCell =
                        td.querySelector(".breakCell");

                    if(breakCell){
                        row.push("BREAK");
                        return;
                    }

                    // MATCH CELL
                    const box =
                        td.querySelector(".categoryBox");

                    if(!box){
                        row.push("");
                        return;
                    }

                    const opponent =
                        box.querySelector(".opponent")
                        ?.innerText.replace("KO","")
                        .trim() || "";

                    const selects =
                        box.querySelectorAll("select");

                    const p1 = selects[0]?.value || "";
                    const p2 = selects[1]?.value || "";

                    const stage =
                        box.classList.contains("knockout")
                        ? " (KO)"
                        : "";

                    row.push(
                        `${opponent} : ${p1}${p2 ? " & "+p2 : ""}${stage}`
                    );
                });

            data.push(row);
        });

    // CREATE WORKBOOK
    const wb = XLSX.utils.book_new();

    const ws =
        XLSX.utils.aoa_to_sheet(data);

    // AUTO COLUMN WIDTH
    ws["!cols"] = headers.map(()=>({wch:30}));

    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Fixtures"
    );

    // FILE NAME
    const fileName =
        `${selectedTeam || "Tournament"}_Fixtures.xlsx`;

    XLSX.writeFile(wb,fileName);
}