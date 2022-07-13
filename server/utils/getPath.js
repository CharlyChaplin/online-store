import * as url from 'url';


const getPath = (strPath) => {
	return url.fileURLToPath(new URL('.', strPath));
}

export default getPath;