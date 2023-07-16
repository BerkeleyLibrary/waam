import React from 'react';
import { Modal } from 'react-bootstrap';

import { intlShape, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
    title: {
        id: 'app.tools.arabic.keyboard.title',
        defaultMessage: 'Arabic keyboard',
    },
    buttonDone: {
        id: 'app.tools.arabic.keyboard.done',
        defaultMessage: 'Done',
    },
    placeholder: {
        id: 'app.tools.arabic.keyboard.placeholder',
        defaultMessage: 'Click on a letter to add it here',
    },
    space: {
        id: 'app.tools.arabic.keyboard.space',
        defaultMessage: 'space',
    },
});

const letters = [
    ['back', '=', '-', '٠', '٩', '٨', '٧', '٦', '٥', '٤', '٣', '٢', '١', 'ذ'],
    ['\\', 'د', 'ج', 'ح', 'خ', 'ه', 'ع', 'غ', 'ف', 'ق', 'ث', 'ص', 'ض'],
    ['ط', 'ك', 'م', 'ن', 'ت', 'ا', 'ل', 'ب', 'ي', 'س', 'ش'],
    ['ظ', 'ز', 'و', 'ة', 'ى', 'لا', 'ر', 'ؤ', 'ء', 'ئ'],
    ['space'],
];

const style = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '0 auto 0',
    },
};

class ArabicKeyboard extends React.Component {
    state = {
        open: false,
        value: '',
    };

    handleDone = () => {
        const { change } = this.props;
        change(this.state.value);
        this.handleClose();
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleClick = val => {
        this.setState(prevState => {
            return { value: prevState.value + val };
        });
    };

    handleBack = () => {
        this.setState(prevState => {
            return {
                value: prevState.value.slice(0, prevState.value.length - 1),
            };
        });
    };

    render() {
        const { intl: { formatMessage } } = this.props;
        return (
            <span className="input-group-text">
                <i
                    className="fas fa-keyboard"
                    onClick={this.handleOpen}
                    style={{ cursor: 'pointer' }}
                />
                <Modal
                    size="lg"
                    aria-labelledby="Arabic Keyboard"
                    centered
                    show={this.state.open}
                    onHide={this.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {formatMessage(messages.title)}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div dir="rtl">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={formatMessage(
                                        messages.placeholder
                                    )}
                                    className="form-control"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                            </div>
                            {letters.map(line => (
                                <div style={style.container} key={line}>
                                    {line.map(letter => {
                                        if (letter === 'back') {
                                            return (
                                                <div
                                                    className="kb-letter"
                                                    key={'back'}
                                                    onClick={this.handleBack}
                                                >
                                                    &rarr;
                                                </div>
                                            );
                                        } else if (letter === 'space') {
                                            return (
                                                <div
                                                    style={{ width: '140px' }}
                                                    className="kb-letter"
                                                    key={'space'}
                                                    onClick={() =>
                                                        this.handleClick(' ')
                                                    }
                                                >
                                                    {formatMessage(
                                                        messages.space
                                                    )}
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div
                                                    key={letter}
                                                    className="kb-letter"
                                                    onClick={() =>
                                                        this.handleClick(letter)
                                                    }
                                                >
                                                    {letter}
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={this.handleDone}
                        >
                            {formatMessage(messages.buttonDone)}
                        </button>
                    </Modal.Footer>
                </Modal>
            </span>
        );
    }
}

const propTypes = {
    intl: intlShape.isRequired,
};

ArabicKeyboard.propTypes = propTypes;

export default injectIntl(ArabicKeyboard);
