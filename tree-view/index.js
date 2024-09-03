const treeData = {
    isEmri: '001001',
    gereksinimler: [
        {
            isEmri: '001001-a',
            gereksinimler: [
                'urun-a',
                'urun-b',
                {
                    isEmri: '001001-a1',
                    gereksinimler: [
                        'urun-c',
                        'urun-d'
                    ]
                }
            ]
        },
        'urun-e',
        {
            isEmri: '001001-b',
            gereksinimler: [
                'urun-f',
                'urun-g'
            ]
        }
    ]
};

function createTreeNode(data) {
    const li = document.createElement('li');
    li.className = 'parent_li';

    if (typeof data === 'string') {
        li.innerHTML = `<span>${data}</span>`;
    } else if (typeof data === 'object') {
        li.innerHTML = `<span><i style="margin-right: 5px;" class="fas fa-plus"></i>${data.isEmri}</span>`;
        
        if (data.gereksinimler && data.gereksinimler.length > 0) {
            const childUl = createTreeNodeList(data.gereksinimler);
            if (childUl.childElementCount > 0) {
                li.appendChild(childUl);
            }
        }
    }

    return li;
}

function createTreeNodeList(items) {
    const ul = document.createElement('ul');

    items.forEach(item => {
        const li = createTreeNode(item);
        if (li) {
            ul.appendChild(li);
        }
    });

    return ul;
}

document.addEventListener('DOMContentLoaded', () => {
    const treeView = document.getElementById('treeContainer');
    const rootUl = document.createElement('ul');

    const rootLi = createTreeNode(treeData);
    rootUl.appendChild(rootLi);
    treeView.appendChild(rootUl);

    document.querySelectorAll('.parent_li > span').forEach(span => {
        span.addEventListener('click', function() {
            const iconInSpan = this.querySelector('i');

            if (iconInSpan?.classList.contains('fa-plus')) {
                iconInSpan.classList.remove('fa-plus')
                iconInSpan.classList.add('fa-minus')
            } else {
                iconInSpan?.classList.remove('fa-minus')
                iconInSpan?.classList.add('fa-plus')
            }

            const parentLi = this.parentNode;
            const childUl = parentLi.querySelector('ul');
            if (childUl) {
                childUl.style.display = childUl.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    document.querySelectorAll('.tree ul ul').forEach(ul => {
        ul.style.display = 'none';
    });
});
