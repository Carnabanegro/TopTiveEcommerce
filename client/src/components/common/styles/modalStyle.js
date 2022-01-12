const ModalBasicStyle = () => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    paper: {
        display: 'flex',
        position: 'absolute',
        fontFamily: 'Roboto, sans-serif',
        backgroundColor: '#FFFAFF',
        opacity: 80,
        padding: 5
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '2em',
        fontweight: 'bolder'
    },
    body: {
        maxHeight: '600px'
    },
    title: {
        fontweight: 'bolder',
        fontSize: '1.5em',
        paddingBottom: 10,
    },
    img: {
        display: 'flex',
        width: '6.5rem',
        border: '0',
        paddingTop: '0.25rem'
    }
});

export default ModalBasicStyle;