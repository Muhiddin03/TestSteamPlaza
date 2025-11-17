const questions = [
    
    { question: "Papka nima uchun ishlatiladi?", options: ["Ma'lumotlarni tartib bilan saqlash", "Internetga ulanish uchun", "Printerni ishlatish uchun"], correct: 0 },

    { question: "Papkani kompyuterdan qanday o‘chirsa bo‘ladi?", options: ["Enter tugmasi bilan", "Kursorni papka ustiga olib borib mishkani o'ng tomini bosiladi Delete tugmasi bisiladi", "Shift tugmasi bilan", ], correct: 1 },

    { question: "Kompyuterda dasturni ishga tushirish uchun nima qilinadi?", options: ["Dastur iconini ikki marta bosisladi", "Klaviaturani o‘chirib yoqiladi", "Papkani ochiladi"], correct: 0 },

    { question: "Kompyuterning asosiy qurilmalari qaysi javobda to'gri berilgan?", options:
         ["Monitor,Mishka,Printer",
             "Sistema Blog,Klaviatura",
              "Klaviatura, Monitor,Sistema Blok"], 
              correct: 2 },

    { question: "Klaviaturadagi Backspace tugmasini bosilsa nima bo'ladi?", options: ["Oxirgi yozilgan belgini o‘chiradi", "Yangi fayl yaratadi", "Kompyuterni o‘chiradi"], correct: 0 },

    { question: "Kompyuter tilini o‘zgartirish uchun klaviaturani qaysi tugmalari ishlatiladi?", options: ["Alt + Shift", "Delete", "Shift + Ctrl", "Shit + A"], correct: 0 },

    { question: "Bo’sh joy tashash uchun klaviaturaning qaysi tugmasidan foydalanamiz?", options: ["Shift", "Delete", "Probil"], correct: 2 },

    { question: "Kompyuterga yozish uchun qaysi qurilma ishlatiladi?", options: [ "Monitor", "Printer", " Klaviatura"], correct: 2 },

    { question: "Kompyuterning qo‘shimcha qurilmasini  toping?", options: ["Sistema blog", "Klaviatura",  "Sichqoncha"], correct: 2 },
    
    { question: "Kompyuterda papka yaratish ketma-ketligi qaysi javobda to'g'ri?", options: ["Bo‘sh joyga mishkani o‘ng tugmani bosib 'New, Folder' tanlash", "Enter tugmasini bosish", "Backspace tugmasini bosish"], correct: 0 },

    { question: "Printer nima uchun ishlatiladi?", options: ["Klaviaturani ishlatish", " Matn yoki rasmni qog‘ozga chiqarish", "Papka yaratish"], correct: 1 },

    { question: "Ilk sichqonchani kim va qachon yaratgan ?", options: ["1968-yil Duglas Engelbar", "1962-yil Toms  Edison", "2000-yil Honred Zuse"], correct: 0 },

    { question: "Michkani o'ng tugmasi bosilsa nima bo'ladi?", options: [ "Buyruqlar oynasi ochiladi", "Dasturga kiradi", "Mishkani o'ng tugmasi yo'q"], correct: 0 },

    { question: "Klaviaturaning vazifasi nima?", options: [ "Kompyuterni ishlashini taminlash.", "Kopyuterga turli ma’lumotlarni kiritish","Kompyuterga jo’natilgan turli ma’lumotlarni  ko’rsatish."], correct: 0 },

    { question: "Kompyuterni ho’l qo’l bilan ishlatsa bo’ladimi?", options: ["Ha", "Yo'q", "Bilmayman"], correct: 1 },

    { question: "Michkani chap tugmasi bosilsa nima bo'ladi?", options: ["Tanlangan matnni nusxalaydi", "Papka yaratadi", "Tanlangan buyruqni bajaradi"], correct: 2 },

    { question: "Kopyuterni orqa fonini o’zgartirish uchun amallar ketmaketligini tanlang.", options: ["Kompyuter sichqonchasini chap tarafi bosiladi va personalizatsiya bo’limiga kiriladi.", "Sichqonchaning o’ng tarafi bosiladi va personalizatsiy bo’limiga kiriladi.", "Kompyuterni qayta ishga tushiradi"], correct: 1 },
    
    { question: "Monitorda mishka bilan harakatlanadigan narsaning nomi nima?", options: ["Mishka", "Kursor", "Backspace "], correct: 1 },

    { question: "Kompyuterda dasturni yopish uchun qaysi tugma ishlatiladi?", options: [ "Enter", "Backspace","X tugmasi (Windowning yuqori o‘ng burchagida)",], correct: 2 },

    { question: "Barcha harflarni bosh harfda yozish uchun qaysi tugmadan foydalanamiz?", options: ["Caps Lock", "Shift", "Ctrl"], correct: 0 }
];

// Raqamlarni aralashtirish (1–20)
function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
    return array;
}
let seats = shuffle(Array.from({length:18},(_,i)=>i+1));
let seatIndex = 0;

const quizContainer=document.getElementById('quiz-container');
const questionNumber=document.getElementById('question-number');
const questionElement=document.getElementById('question');
const optionsContainer=document.getElementById('options');
const successContainer=document.getElementById('success-container');
const failureContainer=document.getElementById('failure-container');
const successSeat=document.getElementById('success-seat');
const failureSeat=document.getElementById('failure-seat');
const progress=document.getElementById('progress');

const correctSounds = [
    document.getElementById('wrong-sound-1'),
    document.getElementById('wrong-sound-2'),
    document.getElementById('wrong-sound-3')   
];

const wrongSounds = [
    document.getElementById('correct-sound-1'),
    document.getElementById('correct-sound-2'),
    document.getElementById('correct-sound-3')
];

let currentQuestion=0;
let selectedOption=null;

// Savolni ko'rsatish
function showQuestion(){
    progress.style.width=`${((currentQuestion+1)/questions.length)*100}%`;
    questionNumber.textContent=`Savol ${currentQuestion+1}/${questions.length}`;
    questionElement.textContent=questions[currentQuestion].question;
    optionsContainer.innerHTML='';
    questions[currentQuestion].options.forEach((option,index)=>{
        const opt=document.createElement('div');
        opt.classList.add('option');
        opt.textContent=option;
        opt.dataset.index=index;
        opt.addEventListener('click',()=>{
            if(selectedOption===null){
                document.querySelectorAll('.option').forEach(o=>o.classList.remove('selected'));
                opt.classList.add('selected');
                selectedOption=index;
                checkAnswer();
            }
        });
        optionsContainer.appendChild(opt);
    });
    selectedOption=null;
    quizContainer.classList.remove('hidden');
    successContainer.classList.add('hidden');
    failureContainer.classList.add('hidden');
}

// Confetti
function playConfetti(){
    for(let i=0;i<100;i++){
        const conf=document.createElement('div');
        conf.classList.add('confetti-piece');
        const type=Math.floor(Math.random()*3);
        if(type===0) conf.style.borderRadius='50%';
        else if(type===1) conf.style.borderRadius='0';
        else conf.style.clipPath='polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)';
        conf.style.backgroundColor=`hsl(${Math.random()*360},100%,50%)`;
        conf.style.left=`${Math.random()*window.innerWidth}px`;
        conf.style.top=`-${Math.random()*50}px`;
        conf.style.width=`${Math.random()*10+5}px`;
        conf.style.height=`${Math.random()*10+5}px`;
        conf.style.position='fixed';
        conf.style.zIndex=9999;
        conf.style.opacity=0.9;
        conf.style.animation=`fall ${2+Math.random()*2}s linear forwards`;
        document.body.appendChild(conf);
        setTimeout(()=>conf.remove(),4000);
    }
}

// Xato animatsiya
function playWrongAnimation(){
    failureContainer.style.animation='shake 0.5s';
    setTimeout(()=>{failureContainer.style.animation='';},500);
}

// Javobni tekshirish
function checkAnswer(){
    if(selectedOption===null) return;

    // Takrorlanmas stol raqami
    const seatNumber = seats[seatIndex++];
    successSeat.textContent=`Stol: ${seatNumber}`;
    failureSeat.textContent=`Stol: ${seatNumber}`;

    if(selectedOption===questions[currentQuestion].correct){
        correctSounds.forEach((sound,i)=>{
            sound.currentTime=0;
            setTimeout(()=>sound.play(), i*400);
        });
        quizContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        playConfetti();
    }else{
        wrongSounds.forEach((sound,i)=>{
            sound.currentTime=0;
            setTimeout(()=>sound.play(), i*300);
        });
        quizContainer.classList.add('hidden');
        failureContainer.classList.remove('hidden');
        playWrongAnimation();
    }

    setTimeout(nextQuestion,2200);
}

// Keyingi savol
function nextQuestion(){
    currentQuestion++;
    if(currentQuestion>=questions.length){
        alert("Siz barcha savollarni yakunladingiz!");
        currentQuestion=0;
        // Yangi o'yin uchun stol raqamlarini qayta aralashtirish
        seats = shuffle(Array.from({length:18},(_,i)=>i+1));
        seatIndex = 0;
    }
    showQuestion();
}

document.addEventListener('DOMContentLoaded', showQuestion);