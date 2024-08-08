// Rating block as Web component

export class StarRating extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.updateLinks();
  }

  static get observedAttributes() {
    return ['low-rating-link', 'high-rating-link', 'show-divider', 'alignment'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get showDivider() {
    return this.hasAttribute('show-divider');
  }

  get alignment() {
    return this.getAttribute('alignment') || 'vertical'; // Default is vertical
  }

  updateLinks() {
    const links = this.shadowRoot.querySelectorAll('.rating-group label a');
    links.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        const url =
          index < 3
            ? this.getAttribute('low-rating-link')
            : this.getAttribute('high-rating-link');
        if (chrome && chrome.tabs && chrome.tabs.create) {
          chrome.tabs.create({ url });
        } else {
          console.error('chrome.tabs API недоступно');
        }
      });
    });
  }

  render() {
    const divider = this.showDivider
      ? '<hr style="border-top: 2px solid #bbb; width: 270px; margin-top: 20px;" />'
      : '';
    const rateUsStyle =
      this.alignment === 'horizontal'
        ? 'display: flex; align-items: center; gap: 20px;'
        : 'text-align: center;';

    this.shadowRoot.innerHTML = `
    <style>
      .full-stars {
        text-align: center;
      }
      .full-stars .rating-group {
        display: inline-flex;
      }
      .full-stars input {
        position: absolute;
        left: -9999px;
      }
      .full-stars label {
        margin: 0;
        cursor: pointer;
      }
      .full-stars label a svg {
        margin: 2px;
        height: 30px;
        width: 30px;
        fill: #ff8400;
        transition: fill 0.3s;
      }
      .full-stars input:checked ~ label a svg {
        fill: #ffc711;
      }
      .full-stars .rating-group:hover label a svg {
        fill: #ff8400;
      }
      .full-stars .rating-group input:hover ~ label a svg {
        fill: #ffc711;
      }
      .rate-us {
        font-family: arial, sans-serif;
        font-size: 16px;
      }
      .text-and-stars {
        justify-content: center;
        ${rateUsStyle}
      }
      .text-and-stars .title {
        margin: 0;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
        font-weight: 300;
        font-size: 1.4rem;
        line-height: 1.75rem;
      }
    </style>
    ${divider}
    <div class="text-and-stars">
    <p class="title" style="text-shadow: white 0 0 3px;">Rate us:</p>
    <div class="full-stars">
      <div class="rating-group">

      <input name="fst" value="5" type="radio" disabled checked />
      <label for="fst-1">
        <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            />
          </svg>
        </a>
      </label>
      <input name="fst" id="fst-1" value="1" type="radio" />
      <label for="fst-2">
        <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            />
          </svg>
        </a>
      </label>
      <input name="fst" id="fst-2" value="2" type="radio" />
      <label for="fst-3">
        <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            />
          </svg>
        </a>
      </label>
      <input name="fst" id="fst-3" value="3" type="radio" />
      <label for="fst-4">
        <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            />
          </svg>
        </a>
      </label>
      <input name="fst" id="fst-4" value="4" type="radio" />
      <label for="fst-5">
        <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            />
          </svg>
        </a>
      </label>
      <input name="fst" id="fst-5" value="5" type="radio" />
        </div>
    </div>
    </div>
    `;
  }
}

customElements.define('star-rating', StarRating);
