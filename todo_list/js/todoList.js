class TodoApp {
    constructor() {
        this.el = document.querySelector('.container');
        this.listContainer = this.el.querySelector('.list_group ul');
        this.lists = [];
        this.init();

        this.load();
    }

    init() {
        this.renderDate();

        this.form = this.el.querySelector('.input_group');
        this.input = this.form.querySelector('input');
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createTodoItem(this.input.value);
        });
    }

    renderDate() {
        this.el.querySelector('.today').innerText = new Date().toLocaleDateString('ko-KR');
    }

    clearInput() {
        this.input.value = '';
    }

    createTodoItem(text) {
        new TodoItem(this, {
            text,
        });

        ui_toast('할일이 추가되었습니다.');
    }

    save() {
        window.localStorage.setItem(
            'todo_list',
            JSON.stringify(
                this.lists.map((el) => {
                    return {
                        id: el.id,
                        text: el.text,
                        checked: el.checked,
                    };
                })
            )
        );
    }

    load() {
        const data = window.localStorage.getItem('todo_list');
        if (data) {
            const parseData = JSON.parse(data);
            parseData.forEach((el) => {
                new TodoItem(this, el);
            });
            this.save();
        }
    }
}

class TodoItem {
    constructor(parent, data) {
        this.parent = parent;
        this.id = data.id || new Date().getTime();
        this.listContainer = parent.listContainer;
        this.el = document.createElement('li');
        this.text = data.text;
        this.checked = data.checked || false;

        this.create(data.text);
    }

    create(text) {
        this.listContent = document.createElement('div');
        this.contentText = document.createElement('p');
        this.buttonWrap = document.createElement('div');

        this.checkbox = document.createElement('div');
        this.checkbox.classList.add('check_box_group');

        this.label = document.createElement('label');
        this.label.setAttribute('for', `list_item_${this.id}`);

        this.inputCheck = document.createElement('input');
        this.inputCheck.setAttribute('type', 'checkbox');
        this.inputCheck.setAttribute('id', `list_item_${this.id}`);
        this.inputCheck.checked = this.checked;
        if (this.checked) {
            this.el.classList.add('checked');
        }

        this.inputCheck.addEventListener('change', this.changeCheckBox.bind(this));

        this.checkbox.append(this.inputCheck, this.label);

        this.editButton = document.createElement('button');
        this.deleteButton = document.createElement('button');

        if (text === '') return;
        this.parent.clearInput();
        this.parent.listId += 1;
        this.contentText.innerText = text;
        this.editButton.innerText = '✍🏻';
        this.deleteButton.innerText = '🗑️';

        this.deleteButton.addEventListener('click', this.delete.bind(this));
        this.editButton.addEventListener('click', this.edit.bind(this));

        this.listContent.classList.add('list_content');
        this.listContent.append(this.contentText);

        this.buttonWrap.append(this.editButton, this.deleteButton);
        this.buttonWrap.classList.add('button_wrap');

        this.el.append(this.checkbox, this.listContent, this.buttonWrap);
        this.listContainer.append(this.el);

        this.parent.lists.push(this);
        this.parent.save();
    }

    edit() {
        this.originText = this.contentText.innerText;
        this.listContent.innerHTML = '';

        this.editForm = document.createElement('form');
        this.editForm.addEventListener('submit', this.applyEdit.bind(this));

        this.editInput = document.createElement('input');
        this.editInput.setAttribute('type', 'text');
        this.editInput.value = this.originText;

        this.editButtonWrap = document.createElement('div');
        this.editButtonWrap.classList.add('button_wrap');

        this.editSubmitButton = document.createElement('button');
        this.editSubmitButton.setAttribute('type', 'submit');
        this.editSubmitButton.innerText = '✍🏻';
        this.editSubmitButton.addEventListener('click', this.applyEdit.bind(this));

        this.editCancleButton = document.createElement('button');
        this.editCancleButton.innerText = '❌';
        this.editCancleButton.addEventListener('click', this.cancleEdit.bind(this));

        this.editButtonWrap.append(this.editSubmitButton, this.editCancleButton);
        this.editForm.append(this.editInput);
        this.buttonWrap.style.display = 'none';

        this.el.append(this.editButtonWrap);
        this.listContent.append(this.editForm);

        this.editInput.focus();
    }

    exitEditMode() {
        this.editForm.removeEventListener('submit', this.applyEdit.bind(this));
        this.editSubmitButton.removeEventListener('click', this.applyEdit.bind(this));
        this.editCancleButton.removeEventListener('click', this.cancleEdit.bind(this));

        this.editForm.remove();

        this.editButtonWrap.remove();
        this.listContent.append(this.contentText);
        this.buttonWrap.removeAttribute('style');

        ui_toast('수정이 완료되었습니다.');
    }

    applyEdit(e) {
        e.preventDefault();
        if (this.editInput.value === '') return;
        this.contentText.innerText = this.editInput.value;
        this.exitEditMode();

        this.parent.save();
    }

    cancleEdit() {
        this.contentText.innerText = this.originText;
        this.exitEditMode();
    }

    delete() {
        this.el.remove();
        this.parent.lists = this.parent.lists.filter((el) => el.id !== this.id);

        this.parent.save();
        ui_toast('할일이 삭제되었습니다.');
    }

    changeCheckBox() {
        this.checked = this.inputCheck.checked;
        if (this.checked) {
            this.el.classList.add('checked');
            ui_toast('할일을 완료하였습니다.');
        } else {
            this.el.classList.remove('checked');
        }
        this.parent.save();
    }
}
