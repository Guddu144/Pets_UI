import { nanoid } from '@reduxjs/toolkit';

const shortid = () => nanoid().slice(0, 8);

export default shortid;
