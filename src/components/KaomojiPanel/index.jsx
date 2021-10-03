// Copyright (c) 2021 Anko Lin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { h, Component } from 'preact'

import './styles.css'

export class KaomojiPanel extends Component {
  render() {
    return (
      <div>
        <h1 className="bililive-kaomoji-title">颜文字</h1>

        <div className="bililive-kaomoji-list">
          {this.props.kaomojis.map((kaomoji) => (
            <a className="kaomoji" onclick={() => this.props.onSelect(kaomoji)}>
              {kaomoji}
            </a>
          ))}
        </div>
      </div>
    )
  }
}
