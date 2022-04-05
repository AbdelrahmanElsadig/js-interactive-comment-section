import { delete_feature,edit_feature} from "./btns";


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

  export {reply_functionality, send_reply,templates}