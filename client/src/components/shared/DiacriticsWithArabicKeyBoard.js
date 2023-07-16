import React from 'react';

import ArabicKeyboard from '../ArabicKeyboard';

export default () => (
    <div className="form-group">
        <div className="form-group">
            <label>Diacritics(copy and paste):</label>
            <div className="input-group">
                <input
                    value={'ā Ā ū ī ḥ Ḥ ḍ Ḍ ṭ Ṭ ṣ Ṣ ẓ Ẓ'}
                    className="form-control"
                    readOnly
                />
                <div className="input-group-append">
                    <ArabicKeyboard change={() => {}} />
                </div>
            </div>
        </div>
    </div>
);
