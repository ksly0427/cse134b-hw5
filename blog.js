// Define the blog post object
class BlogPost {
    constructor(title, date, summary) {
        this.title = title;
        this.date = date;
        this.summary = summary;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    setDate(newDate) {
        this.date = newDate;
    }

    setSummary(newSummary) {
        this.summary = newSummary;
    }
}
const dialogTemplate = `
  <dialog>
    <form>
        <p id="form-heading"></p>
        <label id="tlabel">Title:
            <input type="text" id="titleIn" required>
        </label>
        <label id="dlabel">Date:
            <input type="date" id="dateIn" required>
        </label>
        <label id="slabel">Summary:
            <textarea id="summaryIn"></textarea>
        </label>
        <div>
            <button type="submit" id="confirmBtn">Post</button>
            <button id="cancelBtn">Cancel</button>
        </div>
    </form>
  </dialog>
`;

const parser = new DOMParser();
// Create the array to hold blog posts
let blogPosts = [];

// initial array and local storage
if(localStorage.getItem('posts') == null) {
    blogPosts = [new BlogPost("First Blog!", "2023-03-01", "This is my first blog post!")];
    localStorage.setItem('posts', JSON.stringify(blogPosts));
} else {
    // sync blogPosts and localStorage if localStorage exists
    let objArr = JSON.parse(localStorage.getItem('posts'));
    objArr.forEach((post) => {
        blogPosts.push(new BlogPost(post.title, post.date, post.summary));
    });
}

// CRUD functions
function createBlogPost(title, date, summary) {
    const post = new BlogPost(title, date, summary);
    blogPosts.push(post);
    localStorage.setItem('posts', JSON.stringify(blogPosts));
}

function editBlogPost(ind, title, date, summary) {
    blogPosts[ind].setTitle(title);
    blogPosts[ind].setDate(date);
    blogPosts[ind].setSummary(summary);
    localStorage.setItem('posts', JSON.stringify(blogPosts));
}

function deleteBlogPost(ind) {
    blogPosts.splice(ind, 1);
    localStorage.setItem('posts', JSON.stringify(blogPosts));
}

// custom dialog
export function showDialog(message, del, blog, ind) {
    const dialog = parser.parseFromString(dialogTemplate, 'text/html').querySelector('dialog');
    const heading = dialog.querySelector('p');
    const form = dialog.querySelector('form');
    const titleLab = dialog.querySelector('#tlabel');
    const dateLab = dialog.querySelector('#dlabel');
    const summaryLab = dialog.querySelector('#slabel');
    let titleIn = dialog.querySelector('#titleIn');
    let dateIn = dialog.querySelector('#dateIn');
    let summaryIn = dialog.querySelector('#summaryIn');
    const cancelBtn = dialog.querySelector('#cancelBtn');
    const confirmBtn = dialog.querySelector('#confirmBtn'); 

    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    // set form heading to message
    heading.textContent = message;
    // edit post 
    if(blog != null) {
        titleIn.value = blog.title;
        dateIn.value = blog.date;
        summaryIn.value = blog.summary;
    }

    // delete post
    if(del) {
        titleLab.hidden = true;
        dateLab.hidden = true;
        summaryLab.hidden = true;

        titleIn.required = false;
        dateIn.required = false;

        confirmBtn.textContent = "Yes";
    }
    
    // append dialog to document
    document.body.appendChild(dialog);

    return new Promise((resolve) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            dialog.close();
            if(!del) {
                if(blog == null) {
                    // create a blog post 
                    createBlogPost(DOMPurify.sanitize(titleIn.value), dateIn.value, DOMPurify.sanitize(summaryIn.value));
                } else {
                    //edit blog post
                    editBlogPost(ind, DOMPurify.sanitize(titleIn.value), dateIn.value, DOMPurify.sanitize(summaryIn.value));
                }
            } else {
                // delete blog post
                deleteBlogPost(ind);
            }
            document.body.removeChild(dialog);
            resolve(true);
        });
        cancelBtn.addEventListener('click', (event) => {
            event.preventDefault();
            dialog.close();
            document.body.removeChild(dialog);
            resolve(false);
        });
        dialog.showModal();
    });
}

const blogList = document.getElementById('blog-list');
const output = document.getElementById('output');
export function updateList() {
    blogList.innerHTML = '';
    let storedPosts = JSON.parse(localStorage.getItem('posts'));
    if(storedPosts.length == 0) {
        output.textContent = "No blogs currently posted";
    } else {
        output.textContent = '';
        storedPosts.forEach((item) => {
            const li = `
            <li>
                <h2>${item.title}</h2>
                <h3>${item.date}</h3>
                <p>${item.summary}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </li>`;
            blogList.appendChild(parser.parseFromString(li, 'text/html').querySelector('li'));
        });

        // update edit button event listener
        let editBtns = document.querySelectorAll('.edit-btn');
        editBtns.forEach((editBtn) => {
            editBtn.addEventListener('click', async () => {
                let storedPosts = JSON.parse(localStorage.getItem('posts'));
                let ind = Array.from(blogList.children).indexOf(editBtn.closest('li'));
                const result = await showDialog("Edit Blog Post", false, storedPosts[ind], ind);
                if(result != false) {
                    updateList();
                }
            });
        });

        // update delete button event listener
        let deleteBtns = document.querySelectorAll('.delete-btn');
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', async () => {
                let ind = Array.from(blogList.children).indexOf(deleteBtn.closest('li'));
                const result = await showDialog("Are you sure you want to delete this post?", true, null, ind);
                if(result) {
                    updateList();
                }
            });
        });
    }
}
