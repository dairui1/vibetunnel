/**
 * Full Header Component
 *
 * Full-width header for list view with horizontal layout
 */
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { HeaderBase } from './header-base.js';
import './terminal-icon.js';
import './notification-status.js';

@customElement('full-header')
export class FullHeader extends HeaderBase {
  render() {
    const runningSessions = this.runningSessions;

    return html`
      <div
        class="app-header bg-dark-bg-secondary border-b border-dark-border p-3"
        style="padding-top: max(0.75rem, calc(0.75rem + env(safe-area-inset-top)));"
      >
        <div class="flex items-center justify-between">
          <button
            class="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group"
            title="Go to home"
            @click=${this.handleHomeClick}
          >
            <terminal-icon size="24"></terminal-icon>
            <div class="flex items-baseline gap-2">
              <h1 class="text-xl font-bold text-accent-green font-mono group-hover:underline">
                VibeTunnel
              </h1>
              <p class="text-dark-text-muted text-xs font-mono">
                (${runningSessions.length})
              </p>
            </div>
          </button>

          <div class="flex items-center gap-2">
            <notification-status
              @open-settings=${() => this.dispatchEvent(new CustomEvent('open-settings'))}
            ></notification-status>
            <button
              class="p-2 text-dark-text border border-dark-border hover:border-accent-green hover:text-accent-green rounded-lg transition-all duration-200"
              @click=${() => this.dispatchEvent(new CustomEvent('open-file-browser'))}
              title="Browse Files (⌘O)"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M1.75 1h5.5c.966 0 1.75.784 1.75 1.75v1h4c.966 0 1.75.784 1.75 1.75v7.75A1.75 1.75 0 0113 15H3a1.75 1.75 0 01-1.75-1.75V2.75C1.25 1.784 1.784 1 1.75 1zM2.75 2.5v10.75c0 .138.112.25.25.25h10a.25.25 0 00.25-.25V5.5a.25.25 0 00-.25-.25H8.75v-2.5a.25.25 0 00-.25-.25h-5.5a.25.25 0 00-.25.25z"
                />
              </svg>
            </button>
            <button
              class="p-2 bg-accent-green text-dark-bg hover:bg-accent-green-light rounded-lg transition-all duration-200 vt-create-button"
              @click=${this.handleCreateSession}
              title="Create New Session"
              data-testid="create-session-button"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
              </svg>
            </button>
            ${this.renderUserMenu()}
          </div>
        </div>
      </div>
    `;
  }

  private renderUserMenu() {
    // When no user, don't show anything (settings accessible via notification bell)
    if (!this.currentUser) {
      return html``;
    }

    return html`
      <div class="user-menu-container relative flex-shrink-0">
        <button
          class="font-mono text-sm px-3 py-2 text-dark-text border border-dark-border hover:bg-dark-bg-tertiary hover:text-dark-text rounded-lg transition-all duration-200 flex items-center gap-2"
          @click=${this.toggleUserMenu}
          title="User menu"
        >
          <span class="hidden sm:inline">${this.currentUser}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="sm:hidden"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM3 18a7 7 0 1114 0H3z" />
          </svg>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="currentColor"
            class="transition-transform ${this.showUserMenu ? 'rotate-180' : ''}"
          >
            <path d="M5 7L1 3h8z" />
          </svg>
        </button>
        ${
          this.showUserMenu
            ? html`
              <div
                class="absolute right-0 top-full mt-1 bg-dark-surface border border-dark-border rounded-lg shadow-lg py-1 z-50 min-w-36"
              >
                <div class="px-3 py-2 text-sm text-dark-text-muted border-b border-dark-border">
                  ${this.authMethod || 'authenticated'}
                </div>
                <button
                  class="w-full text-left px-3 py-2 text-sm font-mono text-status-warning hover:bg-dark-bg-secondary hover:text-status-error"
                  @click=${this.handleLogout}
                >
                  Logout
                </button>
              </div>
            `
            : ''
        }
      </div>
    `;
  }
}
