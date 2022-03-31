const templates = (() => {
  function create_reply_form(name, element) {
    const div = document.createElement('div');
    div.classList.add('reply-container');
    div.innerHTML = `<textarea name="comment" placeholder="Add a comment" id="reply_comment" cols="100" rows="4"></textarea>
        <div class="send">
          <img class="pfp" src="./images/avatars/image-juliusomo.png" alt="">
          <input type="submit" name="submit" id='reply' value="Reply">
        </div>`
    element.insertAdjacentElement('afterend', div)
    let textarea = document.querySelector('#reply_comment');
    textarea.textContent = `@${name}, `;
  };



  return {
    reply_form: create_reply_form
  }
})()

const reply_functionality = ((btns) => {
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg_container = btn.closest('.msg-container');
      const name = msg_container.querySelector('.usr').textContent;
      const current = document.querySelector('.reply-container');
      if (current) {
        current.remove()
        return
      }
      templates.reply_form(name, msg_container);
      let reply_btn = document.querySelector('#reply');
      reply_btn.addEventListener('click', () => {
        const current = document.querySelector('.reply-container');
        send_reply(msg_container, {
          image: {
            png: "./images/avatars/image-juliusomo.png"
          },
          score: 0,
          username: 'juliusomo',
          createdAt: 'A few seconds ago'
        });
        current.remove()
      })
    })
  })
})

function send_reply(msg_container, reply) {
  let replies;
  let sibling = msg_container.nextElementSibling;
  if (sibling && sibling.classList.contains('replies')) {
    replies = msg_container.nextElementSibling;
  } else if (msg_container.closest('.replies')) {
    replies = msg_container.closest('.replies')
  } else {
    replies = document.createElement('div');
    replies.classList.add('replies');
    msg_container.insertAdjacentElement('afterend', replies)
  }
  let msg = document.createElement('div');
  msg.classList.add('msg-container');
  msg.classList.add('you');
  msg.innerHTML = `
    <div class="feedbacks">
    <div class="rate">
      <button class="plus">&plus;</button>
      <p class="rating">${reply['score']}</p>
      <button class="minus">&minus;</button>
    </div>
  </div>
  <div class="msg">
    <div class="msg-header">
      <img class="pfp" src="${reply['image']['png']}" alt="">
      <h3 class="usr">${reply['username']}</h3>
      <p class="you">you</p>
      <p class="time-posted">${reply["createdAt"]}</p>
    </div>
    <p class="msg-text"></p>
  </div>


  <div class="reply you">
          <p class="del-edit" id='del'><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                fill="#ED6368" /></svg>Delete</p>
          <p class="del-edit" id='edit'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                fill="#5357B6"/></svg>Edit</p>
        </div>`
  let textarea = document.querySelector('#reply_comment')
  let text = msg.querySelector('.msg-text');
  text.textContent = textarea.value;
  textarea.value = null;
  let del = msg.querySelector('#del');
  let edit = msg.querySelector('#edit');
  edit_feature([edit]);
  delete_feature([del]);
  replies.appendChild(msg);
}


function create_message_from_json(json, reply = false) {
  let container = document.querySelector('.container');
  json.forEach(msg => {
    let div = document.createElement('div');
    div.classList.add('msg-container');
    div.innerHTML = `<div class="feedbacks">
        <div class="rate">
          <button class="plus">&plus;</button>
          <p class="rating">${msg['score']}</p>
          <button class="minus">&minus;</button>
        </div>
      </div>
      <div class="msg">
        <div class="msg-header">
          <img class="pfp" src="${msg['user']['image']['png']}" alt="">
          <h3 class="usr">${msg['user']['username']}</h3>
          <p class="time-posted">${msg["createdAt"]}</p>
        </div>
        <p class="msg-text"></p>
      </div>


      <div class="reply">
        <p class="respond"><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
              fill="#5357B6" /></svg>Reply</p>
      </div>`

    let text = div.querySelector('.msg-text');
    text.textContent = msg['content'];
    container.appendChild(div);
  })
}



function create_replies(msg_container, reply) {
  let replies;
  let sibling = msg_container.nextElementSibling;
  if (sibling && sibling.classList.contains('replies')) {
    replies = msg_container.nextElementSibling;
  } else if (msg_container.closest('.replies')) {
    replies = msg_container.closest('.replies')
  } else {
    replies = document.createElement('div');
    replies.classList.add('replies');
    msg_container.insertAdjacentElement('afterend', replies)
  }
  let msg = document.createElement('div');
  msg.classList.add('msg-container')
  msg.innerHTML = `
    <div class="feedbacks">
    <div class="rate">
      <button class="plus">&plus;</button>
      <p class="rating">${reply['score']}</p>
      <button class="minus">&minus;</button>
    </div>
  </div>
  <div class="msg">
    <div class="msg-header">
      <img class="pfp" src="${reply['user']['image']['png']}" alt="">
      <h3 class="usr">${reply['user']['username']}</h3>
      <p class="time-posted">${reply["createdAt"]}</p>
    </div>
    <p class="msg-text"></p>
  </div>


  <div class="reply">
    <p class="respond"><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
          fill="#5357B6" /></svg>Reply</p>
  </div>`
  if (reply['user']['username'] === 'juliusomo') {
    const reply_you = document.createElement('div');
    reply_you.classList.add('reply');
    reply_you.classList.add('you');
    reply_you.innerHTML = `
      <p class="del-edit" id='del'><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
            fill="#ED6368" /></svg>Delete</p>
      <p class="del-edit" id='edit'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
            fill="#5357B6"/></svg>Edit</p>
      `
    const p = document.createElement('p');
    p.classList.add('you');
    p.textContent = 'you';
    let usr = msg.querySelector('.usr');
    usr.insertAdjacentElement('afterend', p);
    msg.querySelector('.reply').remove()
    msg.querySelector('.msg').insertAdjacentElement('afterend', reply_you)
  }
  let text = msg.querySelector('.msg-text');
  text.textContent = reply['content']
  replies.appendChild(msg);

}



function make_comment(current_user) {
  let btn = document.querySelector('#submit');

  function create() {
    let container = document.querySelector('.sending-container');
    let msg_container = document.createElement('div');
    msg_container.classList.add('msg-container');
    msg_container.classList.add('you');
    msg_container.innerHTML = `
       <div class="feedbacks">
       <div class="rate">
         <button class="plus">&plus;</button>
         <p class="rating">0</p>
         <button class="minus">&minus;</button>
       </div>
     </div>
     <div class="msg">
       <div class="msg-header">
         <img class="pfp" src="${current_user['image']['png']}" alt="">
         <h3 class="usr">${current_user['username']}</h3>
         <p class="you">you</p>
         <p class="time-posted">A few seconds ago</p>
       </div>
       <p class="msg-text"></p>
     </div>
   
   
     <div class="reply you">
          <p class="del-edit" id='del'><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                fill="#ED6368" /></svg>Delete</p>
          <p class="del-edit" id='edit'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                fill="#5357B6"/></svg>Edit</p>
        </div>`
    let text = msg_container.querySelector('.msg-text');
    let msg_txt = document.querySelector('#comment');
    text.textContent = msg_txt.value
    msg_txt.value = null;
    let del = msg_container.querySelector('#del');
    let edit = msg_container.querySelector('#edit');
    edit_feature([edit]);
    delete_feature([del]);
    container.insertAdjacentElement("beforebegin", msg_container);

  }
  btn.addEventListener('click', () => {
    create()
  })
}

function add_modal() {
  let container_modal = document.createElement('div');
  container_modal.classList.add('container-modal');
  container_modal.innerHTML = `<div class="modal">
  <h3>Delete comment</h3>
  <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
  <div class="modal-btns">
    <input type="submit" name="submit" id='cancel' value="NO, CANCEL">
    <input type="submit" name="submit" id='delete' value="YES, DELETE">
  </div>
</div>
<div class="overlay"></div>`;
  const container = document.querySelector('.container');
  container.appendChild(container_modal);
}


function edit_feature(btns = [...document.querySelectorAll('#edit')]) {
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg_container = btn.closest('.msg-container');
      if (msg_container.querySelector('#edit_area')) return
      const text = msg_container.querySelector('.msg-text');
      const textarea = document.createElement('textarea');
      textarea.setAttribute('name', 'edit');
      textarea.setAttribute('placeholder', 'Add a comment');
      textarea.setAttribute('id', 'edit_area');
      textarea.setAttribute('rows', '4');
      textarea.value = text.textContent;
      text.parentNode.replaceChild(textarea, text);
      let update_btn = document.createElement('div');
      update_btn.classList.add('update');
      update_btn.innerHTML = `<input type="submit" name="submit" id='update' value="UPDATE">`;
      const reply_you = msg_container.querySelector('.reply.you');
      reply_you.appendChild(update_btn);
      update_btn.addEventListener('click', () => {
        text.textContent = textarea.value;
        textarea.parentNode.replaceChild(text, textarea);
        update_btn.remove()
      })
    })
  })
}


function delete_feature(btns = [...document.querySelectorAll('#del')]) {
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('.modal');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.add('active')
      modal.classList.add('active');
      let cancel = document.querySelector('#cancel');
      let del = document.querySelector('#delete');
      cancel.addEventListener('click', () => {
        overlay.classList.remove('active')
        modal.classList.remove('active');
      })

      del.addEventListener('click', () => {
        overlay.classList.remove('active')
        modal.classList.remove('active');
        btn.closest('.msg-container').remove()
      })
    })
  })
}









fetch('../data.json')
  .then(res => res.json())
  .then(json => {
    create_message_from_json(json.comments);
    json.comments.forEach(comment => {
      if (comment.replies.length > 0) {
        comment.replies.forEach(reply => {
          let msg_container = document.querySelector('.msg-container:last-child');
          create_replies(msg_container, reply)
        })
      }
    })
    return json
  })
  .then(json => {
    let container = document.querySelector('.container');
    let sending_container = document.createElement('div');
    sending_container.classList.add('sending-container');
    sending_container.innerHTML = `
        <textarea name="comment" placeholder="Add a comment" id="comment" cols="100" rows="4"></textarea>
        <div class="send">
            <img class="pfp" src="./images/avatars/image-juliusomo.png" alt="">
            <input type="submit" name="submit" id='submit' value="SEND">
        </div>`
    container.appendChild(sending_container);
    reply_functionality([...document.querySelectorAll('.respond')]);
    make_comment(json.currentUser);
    edit_feature();
    add_modal()
    delete_feature([...document.querySelectorAll('#del')]);
  })