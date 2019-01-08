class SimpleTabs extends HTMLElement {
  constructor(headerText, сontentText) {
    super();
    const [tempNames] = headerText.split(' ');
    this.navLinkName = tempNames;
    this.name = headerText;
    this.text = сontentText;
    this.tabMap = new Map();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="./style/style.css">
    <nav></nav>
    <div class='tab-container'></div>
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const nav = this.shadowRoot.querySelector('nav');
    const link = document.createElement('a');

    link.setAttribute('href', '#');
    link.setAttribute('class', 'tab-nav');
    link.setAttribute('tab-index', SimpleTabs.guid());
    link.innerText = this.navLinkName;
    link.addEventListener('click', (obj) => {
      this.tabMap.forEach((value, key) => {
        const newMap = new Map(value);
        newMap.forEach((v, k) => {
          if (obj.target.getAttribute('tab-index') === k.getAttribute('tab-index')) {
            k.classList.remove('link_hidden');
            k.classList.add('link_active');
            v.classList.remove('tab_hidden');
            v.classList.add('tab_active');
          } else {
            k.classList.remove('link_active');
            k.classList.add('link_hidden');
            v.classList.remove('tab_active');
            v.classList.add('tab_hidden');
          }
        });
      });
    });
    const tabContainer = this.shadowRoot.querySelector('.tab-container');
    const parentTabDiv = document.createElement('div');
    const childTabDiv = document.createElement('div');
    const header = document.createElement('h1');

    header.innerText = this.name;
    childTabDiv.innerText = this.text;
    parentTabDiv.className = 'tab-card';
    parentTabDiv.setAttribute('tab-index', SimpleTabs.guid());
    parentTabDiv.appendChild(header);
    parentTabDiv.appendChild(childTabDiv);

    this.tabMap.set(
      this.navLinkName,
      new Map([[link, parentTabDiv]]),
    );

    this.tabMap.forEach((value) => {
      const newMap = new Map(value);
      newMap.forEach((v, k) => {
        nav.appendChild(k);
        tabContainer.appendChild(v);
      });
      return newMap;
    });
  }

  static guid() {
    const generatedId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    return generatedId;
  }

  addTab(name, content) {
    const [temp] = name.split(' ');

    if (!new Map(this.tabMap).has(temp)) {
      this.navLinkName = temp;
      this.name = name;
      this.text = content;
      this.tabMap.set(
        temp,
        new Map([
          [this.name, this.content],
        ]),
      );
    }
    this.render();
  }

  addTabs(hedaersAndContents) {
    hedaersAndContents.forEach((value, key) => {
      this.addTab(key, value);
    });
  }
}

customElements.define('simple-tabs', SimpleTabs);
const mySimpleTabs = new SimpleTabs('First tab', 'So rich text is here');
document.body.prepend(mySimpleTabs);

const tabHeadersContent = new Map();
tabHeadersContent.set('Second header', 'here is some rich text');
tabHeadersContent.set('Third header', 'here is some rich text');

/*
// It is extra content for tabs if you want to try to add more tabs.
tabHeadersContent.set('Fourth header', 'here is some rich text');
tabHeadersContent.set('Fifth header', 'here is some rich text');
tabHeadersContent.set('Sixth header', 'here is some rich text');
tabHeadersContent.set('Seventh header', 'here is some rich text');
tabHeadersContent.set('eighth header', 'here is some rich text');
*/
mySimpleTabs.addTabs(tabHeadersContent);
mySimpleTabs.addTab('Here is a custom tab header', 'So lorem ipsum dolor sit amet');
