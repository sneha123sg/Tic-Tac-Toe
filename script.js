let boxes = document.querySelectorAll(".box");
let newbtn = document.querySelector("#new-btn");
let resetBtn = document.querySelector("#reset");
let msg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container");

let turnO = true; // playerX playerO

const winningpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// printing X and O on the screen
// for each box addeventListener
let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){  // playerO // turnO == true
            box.innerText = "O";
            turnO = false;
        }else{  // playerX
            box.innerText = "X";
            turnO = true;
        }
        count++;
        box.disabled = true;
        let iswinner = checkwinner();
        if(count=== 9 && !iswinner){
            checkdraw();
        }
    });
});

const checkdraw = (() => {
    msg.innerText = `Game Draw`;
    msgcontainer.classList.remove("hide");
    disablebtns();
});
    

// getting to know the winner, basically tracking the winnner
let checkwinner = () => {
    for(pattern of winningpatterns){
        // console.log(boxes[0], boxes[1], boxes[2]);
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);

        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        // if the boxes are empty we cant decide the winner
        if(posval1!='' && posval2!='' && posval3!=''){  // boxes should not be empty
            if(posval1 === posval2 && posval2 === posval3){
                console.log("winner is ", posval1);
                showwinner(posval1);
                return true;
            }
        }
    }
};

const showwinner = (winner) => {
    msg.innerText = `Congratulations  winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disablebtns();
};

const disablebtns = () => {
    for(box of boxes){
        box.disabled = true;
    }
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enablebtns();
    msgcontainer.classList.add("hide");
};

const enablebtns = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


newbtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

