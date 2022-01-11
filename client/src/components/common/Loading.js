import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardBody, CardTitle, Row, Spinner
} from 'reactstrap';

const Loading = ({label}) => (
    <div style={{padding: '30px'}}>
        <Card style={{zIndex: '999999'}}>
            <CardBody>
                <CardTitle>
                    <Row style={{justifyContent: 'center'}}>
                        <Spinner
                            color="#26c6da"
                            type="grow"
                            size={50}
                        />
                    </Row>
                    <Row style={{justifyContent: 'center'}}>
                        {label}
                    </Row>
                </CardTitle>
            </CardBody>
        </Card>
    </div>

);

Loading.propTypes = {
    label: PropTypes.string
};

Loading.defaultProps = {
    label: ' Cargando...'
};

export default Loading;