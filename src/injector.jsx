// Copyright (c) 2021 Anko Lin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { h, render } from 'preact'

import { KaomojiPanel } from 'components/KaomojiPanel'
import { kaomojis } from './kaomoji'
import './styles.css'

// Default data attr for the kaomoji icon to get correct styles
const defaultDataAttr = 'data-v-556a6177'

;(function () {
  // Create kaomoji panel
  const panel = document.createElement('div')
  panel.id = 'bililive-kaomoji-panel'
  panel.className = 'common-popup-wrap'
  panel.setAttribute('tabindex', 0)
  panel.addEventListener('blur', panel.remove)

  render(
    <KaomojiPanel
      kaomojis={kaomojis}
      onSelect={(kaomoji) => {
        const input = document.querySelector(
          '#chat-control-panel-vm textarea.chat-input'
        )
        // Input kaomoji at cursur position & move cursor
        input.setRangeText(kaomoji, input.selectionStart, input.selectionEnd)
        input.selectionStart = input.selectionStart + kaomoji.length
        // Fire an input event to trigger Vue's event
        input.dispatchEvent(new Event('input'))
        input.focus()
      }}
    />,
    panel
  )

  // Create kaomoji button
  const icon = document.createElement('span')
  icon.className = 'icon-item icon-font icon-yan-text live-skin-main-text'
  icon.onclick = (event) => {
    // Show kaomoji panel
    const { x, y } = icon.getBoundingClientRect()
    panel.style.left = `${window.scrollX + x - 140}px`
    panel.style.top = `${window.scrollY + y - 410}px`
    document.body.insertBefore(panel, document.body.firstChild)
    panel.focus()
  }

  // Use mutation observer to inject code after page loaded
  const observer = new MutationObserver((mutations, me) => {
    const icons = document.querySelector(
      '#chat-control-panel-vm .icon-left-part'
    )
    if (icons) {
      // Find data attr for correct styles
      var dataAttr = defaultDataAttr
      for (let i = 0; i < icons.attributes.length; i++) {
        const attrName = icons.attributes.item(i).name
        if (attrName.startsWith('data-v-')) {
          dataAttr = attrName
          break
        }
      }
      icon.setAttribute(dataAttr, '')

      icons.appendChild(icon)
      me.disconnect()
    }
  })

  observer.observe(document, {
    childList: true,
    subtree: true,
  })
})()
