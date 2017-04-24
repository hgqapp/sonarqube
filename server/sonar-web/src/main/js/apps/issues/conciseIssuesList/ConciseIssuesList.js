/*
 * SonarQube
 * Copyright (C) 2009-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// @flow
import React from 'react';
import ConciseIssue from './ConciseIssue';
import { scrollToElement } from '../../../helpers/scrolling';
import type { Issue } from '../../../components/issue/types';

type Props = {|
  issues: Array<Issue>,
  onIssueSelect: string => void,
  onLocationSelect: number => void,
  selected?: string,
  selectedLocationIndex: ?number
|};

export default class ConciseIssuesList extends React.PureComponent {
  props: Props;

  handleScroll = (element: HTMLElement) => {
    const scrollableElement = document.querySelector('.layout-page-side');
    if (element && scrollableElement) {
      scrollToElement(element, 150, 100, scrollableElement);
    }
  };

  render() {
    return (
      <div>
        {this.props.issues.map((issue, index) => (
          <ConciseIssue
            key={issue.key}
            issue={issue}
            onLocationSelect={this.props.onLocationSelect}
            onSelect={this.props.onIssueSelect}
            previousIssue={index > 0 ? this.props.issues[index - 1] : null}
            scroll={this.handleScroll}
            selected={issue.key === this.props.selected}
            selectedLocationIndex={this.props.selectedLocationIndex}
          />
        ))}
      </div>
    );
  }
}