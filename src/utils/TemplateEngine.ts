/*
Depends on raw-loader setup with html files
See custom.d.ts, tsconfig.json, and webpack.config.js
*/
export class TemplateEngine{
    static createTemplate(template: string, data: any): string {
        return template.replace(/\${(.*?)}/g, (_, key) => {
            return data[key.trim().replace('data.', '')] || '';
        });
    }

}