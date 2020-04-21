const timer = document.getElementById('counter')
let counter = 0
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const heartBtn = document.getElementById('heart');
const submitBtn = document.getElementById('submit');
const pauseBtn = document.getElementById('pause');
const form = document.getElementById('comment-form');
// DECLARE variable intervalID here so multiple functions will have access
let intervalID

// intervalID is assigned a value of setInterval
function autoTimer() {
  intervalID = setInterval(function() {
    counter += 1
    timer.innerText = `${counter}`
  }, 1000);
}

// intervalID now has value of setInterval that clearInterval can access
function pauseTimer() {
  pauseBtn.addEventListener('click', function() {
    if (pauseBtn.innerText === 'pause') {
      pauseBtn.innerText = 'resume'
      clearInterval(intervalID);
      minusBtn.disabled = 'true';
      plusBtn.disabled = 'true';
      heartBtn.disabled = 'true';
      submitBtn.disabled = 'true';
    } else {
      autoTimer();
      minusBtn.disabled = '';
      plusBtn.disabled = '';
      heartBtn.disabled = '';
      submitBtn.disabled = '';
      pauseBtn.innerText = 'pause'
    }
  })
}

function decrementTimer() {
  minusBtn.addEventListener('click', function() {
  counter -= 1
  timer.innerText = `${counter}`
});
}

function incrementTimer() {
  plusBtn.addEventListener('click', function() {
  counter += 1
  timer.innerText = `${counter}`
});
}

function addComment() {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const commentsDiv = document.getElementById('list');
    const newComment = document.createElement('p');
    commentsDiv.appendChild(newComment);
    const commentContent = document.getElementById('comment-input').value;
    newComment.textContent = commentContent;
  })
}

function likeTimerNumber() {
  heartBtn.addEventListener('click', function() {
    // look for li with id of counter (the timer number)
    const likeListItemID = document.getElementById(`${counter}`)
    // if li with that id already exists, then increase number
    // likeListItemID.dataset.heartCounter returns a string -> need to parse into an integer
    // then, save integer to numLikes
    // increment numLikes so it shows in the innerText (doesn't update the DOM)
    // then, increment likeListItemID.dataset.heartCounter to actually update the DOM 
    if (likeListItemID) {
      let numLikes = parseInt(likeListItemID.dataset.heartCounter, 10)
      ++numLikes
      likeListItemID.innerText = `${counter} has been liked ${numLikes} times.`
      likeListItemID.dataset.heartCounter = numLikes
    } else {
      // if li with that id does not exist yet, then create one
      // then, set id = counter (the timer number)
      // also, initialize custom data attribute, called counter, with 1 
      const likes = document.getElementsByTagName('ul')[0];
      const likeListItem = document.createElement('li');
      likeListItem.id = `${counter}`
      likeListItem.dataset.heartCounter = 1 
      likes.append(likeListItem);
      likeListItem.innerText = `${counter} has been liked 1 time.`
    }
  })
}

autoTimer();
decrementTimer();
incrementTimer();
addComment();
pauseTimer();
likeTimerNumber();