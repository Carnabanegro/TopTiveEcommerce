import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSpinner,
    faCheckDouble,
    faWindowClose
} from '@fortawesome/free-solid-svg-icons';

const InfoHandler = ({
                       saving,
                       loading,
                       success,
                       error,
                         successMsg,
                       errorLabel

                   }) => (
    <Fragment>
        {loading && (
            <Alert
                color="info"
                className="text-center"
            >
                <FontAwesomeIcon
                    icon={faSpinner}
                    pulse
                />
                &nbsp; Cargando
            </Alert>
        )}
        {saving && (
            <Alert
                color="info"
                className="text-center"
            >
                <FontAwesomeIcon
                    icon={faSpinner}
                    pulse
                />
                &nbsp; Guardando
            </Alert>
        )}

        {success && !successMsg && (
            <Alert
                className="text-center"
                color="success"
            >
                <FontAwesomeIcon icon={faCheckDouble}/>
                &nbsp; Guardado con éxito
            </Alert>
        )}
        {error && (
            <Alert
                className="text-center"
                color="danger"
            >
                <FontAwesomeIcon icon={faWindowClose}/>
                &nbsp;&nbsp;
                { errorLabel }
            </Alert>
        )}
        {success && successMsg && (
            <Alert
                className="text-center"
                color="success"
            >
                <FontAwesomeIcon icon={faCheckDouble}/>
                &nbsp;&nbsp;
                { successMsg }
            </Alert>
        )}
    </Fragment>
);

InfoHandler.propTypes = {
    saving: PropTypes.bool,
    loading: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.bool,
    errorLabel: PropTypes.string,
    successMsg: PropTypes.string
};

InfoHandler.defaultProps = {
    saving: false,
    loading: false,
    success: false,
    error: false,
    errorLabel: 'Error en el guardado',
    successMsg: 'Realizado con exito'
};

export default InfoHandler;