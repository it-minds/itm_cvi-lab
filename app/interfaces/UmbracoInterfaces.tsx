// Define interfaces for your expected API response structure
export interface UmbracoApiPage {
    total: number;
    items: ComponentData[];
}

export interface ComponentData {
    name: string;
    contentType: string;
    properties?: Record<string, any>;
    children?: ComponentData[];
}