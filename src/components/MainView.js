import _ from 'lodash';
import React from 'react';
import { observer, inject } from 'mobx-react';

import * as wordsAPI from '../apis/wordsAPI';

import WordsList from 'components/WordsList';

const toWordsList = (wordsMap) => _.map(wordsMap, (word, key) => ({ word, key })).reverse()

const MainView = inject('wordsStore')(observer(({wordsStore}) => (
    <div className="listsContainer">
        <WordsList title="מילה ראשונה"
                   wordsList={toWordsList(wordsStore.getFirst)}
                   onAdd={(word) => wordsAPI.addWord('first', word)}
                   onFilterChange={(filter) => wordsStore.setFilterFirst(filter)}
                   onChange={(word, key) => wordsAPI.updateWord('first', word, key)}
                   onDelete={(key) => wordsAPI.deleteWord('first', key)}
            />

        <WordsList title="מילה שניה"
                   wordsList={toWordsList(wordsStore.getSecond)}
                   onAdd={(word) => wordsAPI.addWord('second', word)}
                   onFilterChange={(filter) => wordsStore.setFilterSecond(filter)}
                   onChange={(word, key) => wordsAPI.updateWord('second', word, key)}
                   onDelete={(key) => wordsAPI.deleteWord('second', key)}
            />
    </div>
)));

MainView.displayName = 'MainView';

export default MainView;