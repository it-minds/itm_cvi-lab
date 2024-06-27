import React from 'react';
import Row from '../components/Row';
import Column from '../components/Column';
import Icon from '../components/Icon';
import { ComponentData } from '../interfaces/UmbracoInterfaces';
import Home from '../components/Home';
import IconModel from '../interfaces/IconModel';

const componentMap: Record<string, React.FC<any>> = {
    'icon': Icon,
    'row': Row,
    'column': Column,
    'home': Home,
    // additional mappings
};

export function RenderComponent(component: ComponentData, key: React.Key): JSX.Element {
    const Component = componentMap[component.contentType];
    if (component.children) {
        return (
            <Component key={key} {...component.properties}>
                {component.children.map((child, index) => RenderComponent(child, index))}
            </Component>
        );
    }
    return <Component key={key} {...component.properties} />;
}

export function RenderIcon(icon: IconModel, key: React.Key): JSX.Element {
        return (
            <Icon key={key} iconName={icon.name} svg={icon.svg} category={icon.category} />
        );
}
