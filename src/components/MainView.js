import _ from 'lodash';
import React from 'react';
import { observer, inject } from 'mobx-react';

import WordsList from 'components/WordsList';

const toWordsList = (wordsMap) => _.map(wordsMap, (word, key) => ({ word, key })).reverse()

const MainView = inject('wordsStore')(observer(({wordsStore}) => (
    <div className="listsContainer">
        <WordsList title="מילה ראשונה"
                   wordsList={toWordsList(wordsStore.getFirst)}
                   onAdd={(word) => wordsStore.addWord('first', word)}
                   onFilterChange={(filter) => wordsStore.setFilterFirst(filter)}
                   onChange={(word, key) => wordsStore.updateWord('first', word, key)}
                   onDelete={(key) => wordsStore.deleteWord('first', key)}
            />

        <WordsList title="מילה שניה"
                   wordsList={toWordsList(wordsStore.getSecond)}
                   onAdd={(word) => wordsStore.addWord('second', word)}
                   onFilterChange={(filter) => wordsStore.setFilterSecond(filter)}
                   onChange={(word, key) => wordsStore.updateWord('second', word, key)}
                   onDelete={(key) => wordsStore.deleteWord('second', key)}
            />
    </div>
)));

MainView.displayName = 'MainView';

export default MainView;