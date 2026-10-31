import type { Source } from '../types';
import './sources.css';

class Sources {
    sourcesContainer = document.querySelector('.sources');

    draw(data: Source[]) {
        if (!this.sourcesContainer) return;

        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) return;

        data.forEach((item) => {
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
