import defaultImage from '../../assets/img/noavatar.svg';
import Block from '../../modules/Block';
import { compile } from '../../modules/templator';
import { template } from './ImageFile.tmpl';
import './imageFile.css';

interface IImageFile {
    classMix?: string;
    src: string;
    alt: string;
    onChange: (file: File) => void;
}

class ImageFile extends Block {
    constructor(props?: IImageFile) {
        super('label', {
            className: 'image-file',
            title: '',
            classNameRoot: props?.classMix
                ? `image-file ${props?.classMix}`
                : 'image-file',
            src: props?.src || defaultImage,
            alt: props?.alt ?? '',
            onChange: props?.onChange,
            events: {
                change: (evt: Event) => {
                    const { files }: { files: FileList | null } =
                        evt.target as HTMLInputElement;

                    if (!files?.length) {
                        return;
                    }

                    const [file] = files;
                    this.props.onChange(file);
                },
            },
        });
    }

    render() {
        return compile(template, this.props);
    }
}

export default ImageFile;
