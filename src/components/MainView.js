import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';

import wordsStore from 'stores/wordsStore';
import { addWord, updateWord, deleteWord } from 'apis/wordsAPI';

import WordsList from 'components/WordsList';

const toWordsList = (wordsMap) => _.map(wordsMap, (word, key) => ({ word, key })).reverse()

const MainView = observer(() => (
    <div className="listsContainer">
        <WordsList title="מילה ראשונה"
                   wordsList={toWordsList(wordsStore.getFirst)}
                   onAdd={(word) => addWord('first', word)}
                   onFilterChange={(filter) => wordsStore.setFilterFirst(filter)}
                   onChange={(word, key) => updateWord('first', word, key)}
                   onDelete={(key) => deleteWord('first', key)}
            />

        <WordsList title="מילה שניה"
                   wordsList={toWordsList(wordsStore.getSecond)}
                   onAdd={(word) => addWord('second', word)}
                   onFilterChange={(filter) => wordsStore.setFilterSecond(filter)}
                   onChange={(word, key) => updateWord('second', word, key)}
                   onDelete={(key) => deleteWord('second', key)}
            />
    </div>
))

MainView.displayName = 'MainView';

export default MainView;