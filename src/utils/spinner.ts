import spinner from '../components/spinner/spinner';

export const showSpinner = () => {
    document.body.append(spinner.getContent());
};

export const hideSpinner = () => {
    spinner.destroy();
};
