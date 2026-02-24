// array rejected & rejected count hobe
let interviewCount = [];
let rejectedCount = [];
let allCurrent = [];

// button -> id
let total = document.getElementById("total-Count");
let interview = document.getElementById("interview-Count");
let rejected = document.getElementById("rejected-Count");

// items button -> id
const allBtn = document.getElementById("btn-all");
const interviewBotton = document.getElementById("btn-interview");
const rejectedBotton = document.getElementById("btn-rejected");

// const interviewBtn = document.getElementById("interviewBtn")

// items card & mainContainer & filter Card section -> id
const allCard = document.getElementById("all-items-Card");
const mainContainer = document.querySelector("main");
const filterCardSection = document.getElementById("filterCard");

// total -> id
function totalCount(){
    total.innerText = allCard.children.length;
    interview.innerText = interviewCount.length;
    rejected.innerText = rejectedCount.length;
};
totalCount()

// button -> function
function toggleStyle(id){
    // add button -> all
    allBtn.classList.add('bg-white', 'text-[#64748B]');
    interviewBotton.classList.add('bg-white', 'text-[#64748B]');
    rejectedBotton.classList.add('bg-white', 'text-[#64748B]');

    // remove button -> all
    allBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    interviewBotton.classList.remove('bg-[#3B82F6]', 'text-white');
    rejectedBotton.classList.remove('bg-[#3B82F6]', 'text-white');

    const selected = document.getElementById(id);

    allCurrent = id

    // bg-color change -> btn
    selected.classList.add('bg-[#3B82F6]', 'text-white');
    selected.classList.remove('bg-white', 'text-[#64748B]');

    if(id == 'btn-interview'){
        allCard.classList.add('hidden');
        filterCardSection.classList.remove('hidden')
        renderInterview()
    } else if(id == 'btn-all'){
        allCard.classList.remove('hidden');
        filterCardSection.classList.add('hidden')
    } else if(id == 'btn-rejected'){
        allCard.classList.add('hidden');
        filterCardSection.classList.remove('hidden')
        renderRejected()
    }
};

// mainContainer -> delegation
mainContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('interviewBtn')){
        const parentNode = event.target.parentNode.parentNode;

        const headTags = parentNode.querySelector('.headTags').innerText
        const subTags = parentNode.querySelector('.subTags').innerText
        const subInfoTags = parentNode.querySelector('.subInfoTags').innerText
        const notApplied = parentNode.querySelector('.notApplied').innerText
        const paragraph = parentNode.querySelector('.paragraph').innerText

        parentNode.querySelector('.notApplied').innerText = 'interview'

        const cardInfo ={
            headTags,
            subTags,
            subInfoTags,
            notApplied:'interview',
            paragraph
        }

        const headExist = interviewCount.find(item => item.headTags == cardInfo.headTags)

        if(!headExist){
            interviewCount.push(cardInfo)
        }

        rejectedCount = rejectedCount.filter(item => item.headTags != cardInfo.headTags)

        if(allCurrent == 'btn-rejected'){
            renderRejected()
        }
        totalCount()

    } else if(event.target.classList.contains('rejectedBtn')){
        const parentNode = event.target.parentNode.parentNode;

        const headTags = parentNode.querySelector('.headTags').innerText
        const subTags = parentNode.querySelector('.subTags').innerText
        const subInfoTags = parentNode.querySelector('.subInfoTags').innerText
        const notApplied = parentNode.querySelector('.notApplied').innerText
        const paragraph = parentNode.querySelector('.paragraph').innerText

        parentNode.querySelector('.notApplied').innerText = 'Rejected'

        const cardInfo ={
            headTags,
            subTags,
            subInfoTags,
            notApplied:'Rejected',
            paragraph
        }

        const headExist = rejectedCount.find(item => item.headTags == cardInfo.headTags)

        if(!headExist){
            rejectedCount.push(cardInfo)
        }

        interviewCount = interviewCount.filter(item => item.headTags != cardInfo.headTags)

        if(allCurrent == 'btn-interview'){
            renderInterview()
        }
        totalCount()
    }
    // 
    else if(event.target.closest('.deleteBtn')){
    const card = event.target.closest('.flex.justify-between');
    const head = card.querySelector('.headTags').innerText;

    //remove
    card.remove();

    interviewCount = interviewCount.filter(item => item.headTags != head);
    rejectedCount = rejectedCount.filter(item => item.headTags != head);

    totalCount();

    if(allCurrent == 'btn-interview'){
        renderInterview()
    }
    if(allCurrent == 'btn-rejected'){
        renderRejected()
    }
}
});

// filter Card section ->interviewCount
function renderInterview(){
    filterCardSection.innerHTML = '';
    for(let interview of interviewCount){
        let div = document.createElement('div');
        div.className = 'flex justify-between px-6 py-6 bg-white border-2 border-[#F1F2F4] rounded-[8px] mt-4'
        div.innerHTML = `
            <div>
                <h3 class="headTags font-semibold text-[18px] text-[#002C5C]">${interview.headTags}</h3>
                <p class="subTags text-[#64748B]">${interview.subTags}</p>
                <div class="subInfoTags flex text-[#64748B] gap-2 text-[14px] mt-[15px]">
                    <p>Remote •</p>
                    <p>Full-time •</p>
                    <p>$130,000 - $175,000</p>
                </div>
                <div class="w-[113px]  items-center justify-center mt-[15px]">
                    <p class="notApplied font-medium text-[14px] text-[#002C5C] px-4 py-2 bg-[#EEF4FF] rounded-[4px] items-center">${interview.notApplied}</p>
                </div>
                <p class="paragraph text-[14px] text-[#323B49] mt-2">${interview.paragraph}</p>
                <div class="flex gap-2 mt-[20px]">
                    <button class="interviewBtn btn btn-soft btn-success text-[14px] font-bold">interview</button>
                    <button class="rejectedBtn btn btn-soft btn-error text-[14px] font-bold">Rejected</button>
                </div>
             </div>
            <div>
                <button class="deleteBtn btn rounded-full px-2 py-2 text-[#64748B]"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `
        filterCardSection.appendChild(div)
    };
};
// filter card section -> rejectedCount
function renderRejected(){
    filterCardSection.innerHTML = '';
    for(let rejecteds of rejectedCount){
        let div = document.createElement('div');
        div.className = 'flex justify-between px-6 py-6 bg-white border-2 border-[#F1F2F4] rounded-[8px] mt-4'
        div.innerHTML = `
            <div>
                <h3 class="headTags font-semibold text-[18px] text-[#002C5C]">${rejecteds.headTags}</h3>
                <p class="subTags text-[#64748B]">${rejecteds.subTags}</p>
                <div class="subInfoTags flex text-[#64748B] gap-2 text-[14px] mt-[15px]">
                    <p>Remote •</p>
                    <p>Full-time •</p>
                    <p>$130,000 - $175,000</p>
                </div>
                <div class="w-[113px]  items-center justify-center mt-[15px]">
                    <p class="notApplied font-medium text-[14px] text-[#002C5C] px-4 py-2 bg-[#EEF4FF] rounded-[4px] items-center">${rejecteds.notApplied}</p>
                </div>
                <p class="paragraph text-[14px] text-[#323B49] mt-2">${rejecteds.paragraph}</p>
                <div class="flex gap-2 mt-[20px]">
                    <button class="interviewBtn btn btn-soft btn-success text-[14px] font-bold">interview</button>
                    <button class="rejectedBtn btn btn-soft btn-error text-[14px] font-bold">Rejected</button>
                </div>
             </div>
            <div>
                <button class="deleteBtn btn rounded-full px-2 py-2 text-[#64748B]"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `
        filterCardSection.appendChild(div)
    };
};