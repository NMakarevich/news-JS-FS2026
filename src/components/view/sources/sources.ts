import type { NormalizedSources, Source } from '../types';
import './sources.css';

class Sources {
    sourcesContainer = document.querySelector('.sources');
    paginationContainer = document.querySelector('.pagination');

    private currentLetter = '';
    private normalizedData: NormalizedSources = {};

    constructor() {
        this.handlePagination();
    }

    get paginatedData() {
        return this.normalizedData[this.currentLetter] ?? [];
    }

    init(data: Source[]) {
        this.createNormalizedData(data);
        this.drawPagination();
        this.draw();
    }

    private drawPagination() {
        if (!this.paginationContainer) return;

        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) return;

        Object.entries(this.normalizedData).forEach(([key, value], index) => {
            const paginationClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const sourceName = paginationClone.querySelector('.source__item-name');
            const sourceItem = paginationClone.querySelector('.source__item');

            if (!sourceName || !sourceItem) return;

            if (index === 0) {
                sourceItem?.classList.add('active');
                this.currentLetter = key;
            }

            sourceName.textContent = `${key} (${value.length})`;
            sourceItem.setAttribute('data-letter', key);

            fragment.append(paginationClone);
        });

        this.paginationContainer.appendChild(fragment);
    }

    private createNormalizedData(data: Source[]) {
        this.normalizedData = data.reduce<NormalizedSources>((norm, source) => {
            const letter = source.name[0];
            if (letter && norm[letter]) {
                norm[letter].push(source);
            } else if (letter && !norm[letter]) {
                norm[letter] = [source];
            }
            return norm;
        }, {});
    }

    private handlePagination = () => {
        if (!this.paginationContainer) return;
        this.paginationContainer.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target && target.classList.contains('source__item')) {
                const letter = target.dataset.letter;
                if (letter) {
                    this.paginationContainer
                        ?.querySelector(`[data-letter=${this.currentLetter}]`)
                        ?.classList.remove('active');
                    this.currentLetter = letter;
                    target.classList.add('active');
                    if (this.normalizedData[letter]) {
                        this.draw();
                    }
                }
            }
        });
    };

    private draw() {
        if (!this.sourcesContainer) return;
        this.sourcesContainer.innerHTML = '';

        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) return;

        this.paginatedData.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const sourceName = sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');

            if (!sourceName || !sourceItem) return;
            sourceName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        this.sourcesContainer.append(fragment);
    }
}

export default Sources;
