import Spinner from '../components/spinner/spinner';

const spinner = new Spinner();

export const showSpinner = () => {
    document.body.append(spinner.getContent());
};

export const hideSpinner = () => {
    spinner.destroy();
};
