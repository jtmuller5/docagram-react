import {
  ExportedData,
  Relationship,
} from "../../side_panel/types/relationship";

export class RelationshipService {
  private relationships: Relationship[];
  private uniqueEntities: Map<string, string>; // Entity name to source URL mapping
  private selectedEntity: string | null;
  private uniqueEntityCount: Map<string, number>; // Entity name to count mapping

  constructor() {
    this.relationships = [];
    this.uniqueEntities = new Map<string, string>();
    this.selectedEntity = null;
    this.uniqueEntityCount = new Map<string, number>();
  }

  /**
   * Parses relationships from a given text and updates internal state.
   *
   * @param text - The text containing relationship definitions.
   * @param sourceUrl - The source URL associated with the relationships.
   * @returns An array of newly added relationships.
   */
  parseRelationships(text: string, sourceUrl: string): Relationship[] {
    const newRelationships: Relationship[] = [];
    const lines = text.split("\n");

    for (const line of lines) {
      const match = line.match(/([^()]+?)\s+to\s+([^()]+?)\s*\(([^)]+)\)/i);
      if (match) {
        const entity1 = match[1].trim();
        const entity2 = match[2].trim();

        // Increment entity count
        this.uniqueEntityCount.set(
          entity1,
          (this.uniqueEntityCount.get(entity1) || 0) + 1
        );
        this.uniqueEntityCount.set(
          entity2,
          (this.uniqueEntityCount.get(entity2) || 0) + 1
        );

        // Store entities with their source URL if they don't already exist
        if (!this.uniqueEntities.has(entity1)) {
          this.uniqueEntities.set(entity1, sourceUrl);
        }
        if (!this.uniqueEntities.has(entity2)) {
          this.uniqueEntities.set(entity2, sourceUrl);
        }

        newRelationships.push({
          entity1,
          entity2,
          description: match[3].trim(),
          sourceUrl,
        });
      }
    }

    this.relationships = [...this.relationships, ...newRelationships];
    return newRelationships;
  }

  /**
   * Resets the manager's state, clearing all relationships and entities.
   */
  reset(): void {
    this.relationships = [];
    this.uniqueEntities.clear();
    this.selectedEntity = null;
    this.uniqueEntityCount.clear();
  }

  /**
   * Retrieves all stored relationships.
   *
   * @returns An array of relationships.
   */
  getRelationships(): Relationship[] {
    return this.relationships;
  }

  /**
   * Retrieves a sorted list of unique entity names.
   *
   * @returns An array of entity names.
   */
  getEntitiesList(): string[] {
    return Array.from(this.uniqueEntities.keys()).sort();
  }

  /**
   * Gets the source URL for a given entity.
   *
   * @param entity - The name of the entity.
   * @returns The source URL associated with the entity, or undefined if not found.
   */
  getEntitySource(entity: string): string | undefined {
    return this.uniqueEntities.get(entity);
  }

  /**
   * Selects an entity and retrieves its relationships.
   *
   * @param entity - The name of the entity to select.
   * @returns An array of relationships involving the selected entity.
   */
  selectEntity(entity: string): Relationship[] {
    this.selectedEntity = entity;
    return this.getEntityRelationships(entity);
  }

  /**
   * Retrieves relationships that involve a specific entity.
   *
   * @param entity - The name of the entity.
   * @returns An array of relationships involving the entity.
   */
  getEntityRelationships(entity: string): Relationship[] {
    return this.relationships.filter(
      (rel) => rel.entity1 === entity || rel.entity2 === entity
    );
  }

  /**
   * Exports the manager's data to a JSON-serializable object.
   *
   * @returns An object containing relationships, entities, and the selected entity.
   */
  exportToJson(): ExportedData {
    return {
      relationships: this.relationships,
      entities: Object.fromEntries(this.uniqueEntities),
      selectedEntity: this.selectedEntity,
    };
  }

  /**
   * Imports data from a JSON object, updating the manager's state.
   *
   * @param jsonData - The JSON data to import.
   */
  importFromJson(jsonData: ExportedData): void {
    this.relationships = jsonData.relationships || [];
    this.uniqueEntities = new Map<string, string>(
      Object.entries(jsonData.entities || {})
    );
    this.selectedEntity = jsonData.selectedEntity || null;

    // Rebuild uniqueEntityCount based on imported relationships
    this.uniqueEntityCount.clear();
    for (const rel of this.relationships) {
      this.uniqueEntityCount.set(
        rel.entity1,
        (this.uniqueEntityCount.get(rel.entity1) || 0) + 1
      );
      this.uniqueEntityCount.set(
        rel.entity2,
        (this.uniqueEntityCount.get(rel.entity2) || 0) + 1
      );
    }
  }
}