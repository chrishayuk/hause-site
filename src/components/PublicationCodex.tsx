import { Codex, FolioObject, Marginalia } from '@chrishayuk/hause/components/Codex';
import { NotebookEdition } from '@chrishayuk/hause/components/NotebookEdition';

/** A composition specimen, explicitly not an invented research history. */
export function PublicationCodex() {
 return <NotebookEdition as="article"><Codex id="publication-codex" title="An entry you can handle." collection="HAUSE / Codex specimen" byline={<span>Composition study · no experiment results</span>}
  folios={[
   {id:'codex-reading-surface',label:'A spread',children:<><FolioObject place="left"><h2>The page is a working surface.</h2><p>Keep an observation beside its object, with the qualification attached.</p></FolioObject><FolioObject place="right"><p>This specimen uses native text and layout. Your instruments, photographs and measurements occupy the same surface.</p></FolioObject><FolioObject place="margin"><Marginalia label="Source"><p>This is a typography and interaction specimen. It contains no measured result.</p></Marginalia></FolioObject></>},
   {id:'codex-evidence-surface',label:'An attached record',kind:'evidence',children:<><FolioObject place="main"><h2>Every object can lead back to its record.</h2><p>Evidence navigation is an ordinary fragment link. The view opens its destination; text remains selectable.</p><a href="/publication#recorded-evidence">Inspect the actual ADDRESS-BUILD-1 measurements ↗</a></FolioObject><FolioObject place="margin"><Marginalia label="Reading order"><p>Spread numbers describe this composition. They are not historical manuscript identifiers.</p></Marginalia></FolioObject></>},
  ]}
  manuscript={<p>A codex binds a single entry into authored spreads. It retains a direct linear reading view. Use the index, previous and next controls, arrow keys on the spread, or its separate drag strip. Text selection and instrument controls keep their own interactions.</p>}
  history={<p>This composition specimen has no experimental revisions. The consuming publication supplies its own preserved editions and source history; the shell does not generate them.</p>}/></NotebookEdition>;
}
