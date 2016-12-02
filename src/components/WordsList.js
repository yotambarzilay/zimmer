import React from 'react';

import RemovableTextInput from 'components/RemovableTextInput';

const WordsList = ({title, wordsList, onAdd, onFilterChange, onChange, onDelete}) => (
    <div className="list">
        <h3>{title}</h3>
        <ul>
            <li>
                <RemovableTextInput onSubmit={onAdd}
                                    clearOnSubmit={true}
                                    submitLabel="+"
                                    onChange={onFilterChange}
                    />
            </li>
            {wordsList.map(({key, word}) => (
                <li key={key}>
                    <RemovableTextInput label={word}
                                        id={key}
                                        onSubmit={onChange}
                                        onDelete={onDelete}
                                        submitLabel="v"
                        />
                </li>
            ))}
        </ul>
    </div>
)

const { PropTypes } = React;

WordsList.displayName = 'WordsList';
WordsList.propTypes = {
    title: PropTypes.string,
    wordsList: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            word: PropTypes.string.isRequired
        })
    ),
    onAdd: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default WordsList;