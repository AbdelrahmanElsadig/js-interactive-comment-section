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

  
  export {delete_feature,edit_feature,add_modal}