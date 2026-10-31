import type { Article } from '../types';
import './news.css';

class News {
    newsContainer = document.querySelector('.news');

    draw(data: Article[]) {
        if (!this.newsContainer) return;
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item');
                if (newsItem) {
                    newsItem.classList.add('alt');
                }
            }

            const newsPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (newsPhoto) {
                newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }
            this.addTextContent(newsClone, '.news__meta-author', item.author || item.source.name);
            this.addTextContent(
                newsClone,
                '.news__meta-date',
                item.publishedAt.slice(0, 10).split('-').reverse().join('-')
            );
            this.addTextContent(newsClone, '.news__description-title', item.title);
            this.addTextContent(newsClone, '.news__description-source', item.source.name);
            this.addTextContent(newsClone, '.news__description-content', item.description);

            const readMore = newsClone.querySelector('.news__read-more a');
            if (readMore) {
                readMore.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        this.newsContainer.innerHTML = '';
        this.newsContainer.appendChild(fragment);
    }

    addTextContent(parent: HTMLElement, selector: string, textContent: string) {
        const element = parent.querySelector(selector);
        if (element) {
            element.textContent = textContent;
        }
    }
}

export default News;
