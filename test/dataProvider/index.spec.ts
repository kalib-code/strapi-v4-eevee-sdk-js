import axios from 'axios';
// eslint-disable-next-line
import { Strapi } from '../../src/lib/strapi';
import './index.mock';

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Strapi', () => {
  // @ts-ignore
  const API_URL = 'http://localhost:1337/api';
  const axiosInstance = axios.create();
  // @ts-ignore: Unreachable code error
  beforeAll(() => {
    axiosInstance.defaults.headers = {
      // @ts-ignore
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM5NDgxNjgzLCJleHAiOjE2NDIwNzM2ODN9.yqfuYb-Mr7I_VDxd2pe6elDROGiA6vqvChY_xNIIPu8`,
    };
  });

  // create
  describe('create', () => {
    it('correct response', async () => {
      const { data } = await Strapi(API_URL, axiosInstance).create({
        resource: 'posts',
        variables: { title: 'foo', content: 'bar', cover: ['32'] },
      });
      // @ts-ignore
      expect(data.data.id).toBe(20);
      // @ts-ignore
      expect(data.data.attributes.title).toBe('foo');
      // @ts-ignore
      expect(data.data.attributes.content).toBe('bar');
    });
  });

  // deleteMany
  describe('deleteMany', () => {
    it('correct response', async () => {
      const { data } = await Strapi(API_URL, axiosInstance).deleteMany({
        resource: 'posts',
        ids: ['20'],
      });
      // @ts-ignore
      expect(data[0].data.id).toBe(20);
      // @ts-ignore
      expect(data[0].data.attributes.title).toBe('foo');
      // @ts-ignore
      expect(data[0].data.attributes.content).toBe('bar');
    });
  });

  // deleteOne
  describe('deleteOne', () => {
    it('correct response', async () => {
      const { data } = await Strapi(API_URL, axiosInstance).deleteOne({
        resource: 'posts',
        id: '18',
      });
      // @ts-ignore
      expect(data.data.id).toBe(18);
      // @ts-ignore
      expect(data.data.attributes.title).toBe('foo');
      // @ts-ignore
      expect(data.data.attributes.content).toBe('bar');
    });
  });

  describe('getList', () => {
    it('correct response', async () => {
      const { data, total } = await Strapi(API_URL, axiosInstance).getList({
        resource: 'posts',
      });
      // @ts-ignore
      expect(data[2].id).toBe(17);
      // @ts-ignore
      expect(data[2].title).toBe('foo');
      // @ts-ignore
      expect(data[2].content).toBe('bar');
      // @ts-ignore
      expect(total).toBe(6);
    });

    it('correct sorting response', async () => {
      const { data, total } = await Strapi(API_URL, axiosInstance).getList({
        resource: 'posts',
        sort: [
          {
            field: 'id',
            order: 'desc',
          },
        ],
      });
      // @ts-ignore
      expect(data[0].id).toBe(21);
      // @ts-ignore
      expect(data[0].title).toBe('foo');
      // @ts-ignore
      expect(data[0].content).toBe('bar');
      // @ts-ignore
      expect(total).toBe(6);
    });

    it('correct filter response', async () => {
      const { data } = await Strapi(API_URL, axiosInstance).getList({
        resource: 'posts',
        filters: [
          {
            field: 'title',
            operator: 'eq',
            value: 'foo',
          },
        ],
      });
      // @ts-ignore
      expect(data[0]['title']).toBe('foo');
      // @ts-ignore
      expect(data.length).toBe(3);
    });

    it('correct filter and sort response', async () => {
      const { data } = await Strapi(API_URL, axiosInstance).getList({
        resource: 'posts',
        filters: [
          {
            field: 'title',
            operator: 'eq',
            value: 'foo',
          },
        ],
        sort: [
          {
            field: 'id',
            order: 'desc',
          },
        ],
      });
      // @ts-ignore
      expect(data[0].title).toBe('foo');
      // @ts-ignore
      expect(data.length).toBe(3);
    });

    it('correct locale response', async () => {
      const { data, total } = await Strapi(API_URL, axiosInstance).getList({
        resource: 'posts',
        metaData: {
          locale: 'de',
        },
      });
      // @ts-ignore
      expect(data[0].title).toBe('Hello');
      // @ts-ignore
      expect(data[0].locale).toBe('de');
      // @ts-ignore
      expect(total).toBe(3);
    });

    it('correct fields response', async () => {
      const { data, total } = await Strapi(API_URL, axiosInstance).getList({
        resource: 'posts',
        metaData: {
          fields: ['title', 'content'],
        },
      });
      // @ts-ignore
      expect(data[0]).toEqual({
        id: 5,
        title: 'Lorem ipsum began as scrambled',
        content:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n\n_**“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”**_\n\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.\n\nThe passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
      });
      // @ts-ignore
      expect(total).toBe(4);
    });

    it('correct populated response', async () => {
      const { data, total } = await Strapi(API_URL, axiosInstance).getList({
        resource: 'posts',
        metaData: {
          populate: ['category'],
        },
      });
      // @ts-ignore
      expect(data[0].category).toBeTruthy();
      // @ts-ignore
      expect(total).toBe(4);
    });
  });

  // getMany
  describe('getMany', () => {
    it('correct response', async () => {
      const { data } = await Strapi(API_URL, axiosInstance).getMany({
        resource: 'posts',
        ids: ['8'],
      });
      // @ts-ignore
      expect(data[0].id).toBe(8);
      // @ts-ignore
      expect(data[0].title).toBe('Hello');
      // @ts-ignore
      expect(data[0].content).toBe('New post content');
    });
  });

  // getOne
  describe('getOne', () => {
    it('correct response', async () => {
      const { data } = await Strapi(API_URL, axiosInstance).getOne({
        resource: 'posts',
        id: '8',
      });
      // @ts-ignore
      expect(data.id).toBe(8);
      // @ts-ignore
      expect(data.title).toBe('Hello');
      // @ts-ignore
      expect(data.content).toBe('New post content');
    });
  });

  // updateOne
  describe('updateOne', () => {
    it('correct response', async () => {
      const { data } = await Strapi(API_URL, axiosInstance).update({
        resource: 'posts',
        id: '8',
        variables: {
          title: 'Updated Title',
        },
      });
      // @ts-ignore
      expect(data.data.id).toBe(8);
      // @ts-ignore
      expect(data.data.attributes.title).toBe('Updated Title');
    });
  });

  // updateMany
  describe('updateMany', () => {
    it('correct response', async () => {
      const { data } = await Strapi(API_URL, axiosInstance).updateMany({
        resource: 'posts',
        ids: ['8', '17'],
        variables: {
          title: 'Updated titles',
        },
      });
      // @ts-ignore
      expect(data[0].data.id).toBe(8);
      // @ts-ignore
      expect(data[0].data.attributes.title).toBe('Updated titles');
      // @ts-ignore
      expect(data[1].data.id).toBe(17);
      // @ts-ignore
      expect(data[1].data.attributes.title).toBe('Updated titles');
    });
  });

  // createMany
  describe('createMany', () => {
    it('correct response', async () => {
      const { data } = await Strapi(API_URL, axiosInstance).createMany({
        resource: 'posts',
        variables: [
          {
            title: 'New Post One',
            content: 'New Content One',
          },
          {
            title: 'New Post Two',
            content: 'New Content Two',
          },
        ],
      }); // @ts-ignore

      expect(data[0].data.id).toBe(29);
      // @ts-ignore
      expect(data[0].data.attributes.title).toBe('New Post One');
      // @ts-ignore

      expect(data[1].data.id).toBe(30);
      // @ts-ignore
      expect(data[1].data.attributes.title).toBe('New Post Two');
    });
  });
});
