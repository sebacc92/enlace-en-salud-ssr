import { component$ } from '@builder.io/qwik';
import { Contact } from '~/components/landing/contact/contact';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import { useGlobalConfig } from '~/routes/layout';

export interface ContactBlok extends SbBlokData {
    title?: string;
    description?: string;
    button_label?: string;
    success_message?: string;
}

interface Props {
    blok: ContactBlok;
}

export default component$<Props>(({ blok }) => {
    const globalConfig = useGlobalConfig();

    return (
        <div {...storyblokEditable(blok)}>
            <Contact
                title={blok.title}
                description={blok.description}
                buttonLabel={blok.button_label}
                successMessage={blok.success_message}
                email={globalConfig.value?.email}
            />
        </div>
    );
});
