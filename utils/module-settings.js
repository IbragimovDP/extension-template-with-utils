export class SettingsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        .settings-container {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 9999;
        }

        .settings-icon {
          cursor: pointer;
          padding: 24px;
          font-size: 24px;
        }

        .settings-dropdown {
          display: none;
          position: absolute;
          background-color: #ffffff;
          color: #000;
          text-align: left;
          border-radius: 6px;
          padding: 16px;
          box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2);
          z-index: 1;
          right: 10px;
          top: 50px;
          width: auto;
        }

        .settings-header {
          font-size: 24px;
          margin-bottom: 10px;
          font-weight: bold;
          text-align: center;
        }

        .settings-option {
          display: flex;
          align-items: center;
          white-space: nowrap;
        }

        .settings-option input[type='checkbox'] {
          margin-left: 10px;
        }

        .settings-icon:hover + .settings-dropdown,
        .settings-dropdown:hover {
          display: block;
        }
      </style>
      <div class="settings-container">
        <div class="settings-icon">⚙️</div>
        <div class="settings-dropdown">
          <div class="settings-header">Settings</div>
          <label class="settings-option">
            Show extension icon on all sites
            <input type="checkbox" id="toggleExtensionIcon" />
          </label>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.initializeSettings();
    this.setupStorageChangeListener();
  }

  async initializeSettings() {
    var local = await chrome.storage.local.get('bottomBarEnabled');
    var bottomBarEnabled = local.bottomBarEnabled;
    if (bottomBarEnabled === undefined) bottomBarEnabled = false;
    if (bottomBarEnabled) this.createBottomBar();
    this.toggleButton(bottomBarEnabled);
  }

  toggleButton(value) {
    var toggleButton = this.shadowRoot.getElementById('toggleExtensionIcon');
    if (toggleButton) {
      toggleButton.checked = value;
      toggleButton.addEventListener('change', () => {
        // Toggle bottom bar state
        var bottomBarEnabled = toggleButton.checked;
        if (bottomBarEnabled) {
          return chrome.storage.local.set({ bottomBarEnabled: true });
        }
        return chrome.storage.local.set({ bottomBarEnabled: false });
      });
    }
  }

  bottomBar = null;

  createBottomBar() {
    this.bottomBar = document.createElement('a');

    this.bottomBar.style.position = 'fixed';
    this.bottomBar.style.bottom = '-40px';
    this.bottomBar.style.left = '50%';
    this.bottomBar.style.zIndex = '9999';
    this.bottomBar.style.transform = 'translateX(-50%)';
    this.bottomBar.style.backgroundColor = '#EEEEEE';
    this.bottomBar.style.borderRadius = '5px 5px 0px 0px';
    this.bottomBar.style.opacity = '0.3';
    this.bottomBar.style.padding = '5px';
    this.bottomBar.id = 'bottomBar';
    this.bottomBar.style.transition = '0.3s';
    this.bottomBar.style.cursor = 'pointer';
    this.bottomBar.style.maxHeight = '100px';
    this.bottomBar.style.left = '0px';
    this.bottomBar.style.maxWidth = '45px';

    this.bottomBar.addEventListener('mouseover', () => {
      this.bottomBar.style.opacity = '0.5';
      this.bottomBar.style.bottom = '0';
      this.bottomBar.style.left = '20px';
    });

    this.bottomBar.addEventListener('mouseout', () => {
      this.bottomBar.style.opacity = '0.3';
      this.bottomBar.style.bottom = '-40px';
      this.bottomBar.style.left = '0px';
    });

    this.bottomBar.onclick = () => {
      chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
    };

    const image = 'src/images/icon128.png'; // Change path to your image
    this.bottomBar.innerHTML = `<img src="${image}" style="width: 32px; height: 32px;"/>`;

    document.body.appendChild(this.bottomBar);
  }

  removeBottomBar() {
    if (this.bottomBar !== null) {
      this.bottomBar.remove();
      this.bottomBar = null;
    }
  }

  setupStorageChangeListener() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'bottomBarEnabled' && newValue) {
          this.createBottomBar();
        } else {
          this.removeBottomBar();
        }
      }
    });
  }
}

if (customElements != null) {
  customElements.define('module-settings', SettingsComponent);
} else {
  document.addEventListener('DOMContentLoaded', async function () {
    var local = await chrome.storage.local.get('bottomBarEnabled');
    var bottomBarEnabled = local.bottomBarEnabled;
    if (bottomBarEnabled === undefined) bottomBarEnabled = false;
    if (bottomBarEnabled) createBottomBar();
    toggleButton(bottomBarEnabled);
  });

  function toggleButton(value) {
    var toggleButton = document.getElementById('toggleExtensionIcon');
    if (toggleButton) {
      document.getElementById('toggleExtensionIcon').checked = value;

      toggleButton.addEventListener('change', function () {
        // Toggle bottom bar state
        var bottomBarEnabled = this.checked;

        chrome.runtime.sendMessage({
          action: 'toggleBottomBar',
          enabled: bottomBarEnabled,
        });
      });
    }
  }

  let bottomBar = null;

  function createBottomBar() {
    bottomBar = document.createElement('a');

    bottomBar.style.position = 'fixed';
    bottomBar.style.bottom = '-40px';
    bottomBar.style.left = '50%';
    bottomBar.style.zIndex = '9999';
    bottomBar.style.transform = 'translateX(-50%)';
    bottomBar.style.backgroundColor = '#EEEEEE';
    bottomBar.style.borderRadius = '5px 5px 0px 0px';
    bottomBar.style.opacity = '0.3';
    bottomBar.style.padding = '5px';
    bottomBar.id = 'bottomBar';
    bottomBar.style.transition = '0.3s';
    bottomBar.style.cursor = 'pointer';
    bottomBar.style.maxHeight = '100px';
    bottomBar.style.left = '0px';
    bottomBar.style.maxWidth = '45px';

    bottomBar.addEventListener('mouseover', () => {
      bottomBar.style.opacity = '0.5';
      bottomBar.style.bottom = '0';
      bottomBar.style.left = '20px';
    });

    bottomBar.addEventListener('mouseout', () => {
      bottomBar.style.opacity = '0.3';
      bottomBar.style.bottom = '-40px';
      bottomBar.style.left = '0px';
    });

    bottomBar.onclick = () => {
      chrome.runtime.sendMessage({
        action: 'openNewTab',
        url: chrome.runtime.getURL('index.html'),
      });
    };

    const image = chrome.runtime.getURL('../../src/images/icon128.png');
    bottomBar.innerHTML = `<img src="${image}" style="width: 32px; height: 32px;"/>`;

    document.body.appendChild(bottomBar);
  }

  function removeBottomBar() {
    if (bottomBar !== null) {
      bottomBar.remove();
      bottomBar = null;
    }
  }

  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (newValue) {
        createBottomBar();
      } else {
        removeBottomBar();
      }
    }
  });
}
